import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { GrowthBlueprint } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blueprint = await getBlueprint(params.slug);
  
  if (!blueprint) {
    return {
      title: 'Blueprint Not Found',
    };
  }
  
  return {
    title: `${blueprint.title} | Growth Blueprint`,
    description: blueprint.description,
  };
}

async function getBlueprint(slug: string): Promise<GrowthBlueprint | null> {
  try {
    // Create an absolute URL - this is required for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL(`/api/growth-blueprints/${slug}`, baseUrl);
    
    const response = await fetch(url, {
      cache: 'no-cache' // Ensure we get fresh data
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching blueprint with slug ${slug}:`, error);
    return null;
  }
}

async function getRelatedBlueprints(currentSlug: string): Promise<GrowthBlueprint[]> {
  try {
    // Create an absolute URL - this is required for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL('/api/growth-blueprints', baseUrl);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    // Filter out the current blueprint and limit to 3 related blueprints
    return data
      .filter((blueprint: GrowthBlueprint) => blueprint.slug !== currentSlug)
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching related blueprints:', error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    // Create an absolute URL - this is required for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL('/api/growth-blueprints', baseUrl);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.map((blueprint: GrowthBlueprint) => ({
      slug: blueprint.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlueprintPage({ params }: PageProps) {
  const blueprint = await getBlueprint(params.slug);
  
  if (!blueprint) {
    notFound();
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
              <Link href="/growth-blueprints">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Growth Blueprints
              </Link>
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {blueprint.categories && blueprint.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blueprint.categories.map((category, i) => (
                  <span 
                    key={i}
                    className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-opensauce mb-6">
              {blueprint.title}
            </h1>
            
            <div className="flex items-center text-muted-foreground mb-8">
              <span>Published {formatDate(blueprint.created_at)}</span>
              {blueprint.updated_at && blueprint.updated_at !== blueprint.created_at && (
                <span className="ml-4">
                  Updated {formatDate(blueprint.updated_at)}
                </span>
              )}
            </div>
            
            {blueprint.image_url && (
              <div className="rounded-xl overflow-hidden mb-12">
                <img 
                  src={blueprint.image_url} 
                  alt={blueprint.title} 
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {blueprint.description && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold font-opensauce mb-4">Overview</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>{blueprint.description}</p>
                </div>
              </div>
            )}
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blueprint.content || '' }} />
            </div>
            
            {blueprint.tags && blueprint.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {blueprint.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="inline-block bg-muted px-3 py-1 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-opensauce mb-6">
              Need Personalized Growth Strategies?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team of research experts can help you create a customized growth strategy based on your specific business challenges and opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  View Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 