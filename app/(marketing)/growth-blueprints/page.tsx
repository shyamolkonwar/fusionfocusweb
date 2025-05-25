import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { GrowthBlueprint } from "@/types/supabase";

export const metadata: Metadata = {
  title: "Growth Blueprints | Data-driven Strategies for SaaS",
  description: "Free research-backed strategies and guides to help SaaS founders scale their businesses effectively.",
};

// Placeholder component for blueprints without images
function PlaceholderImage({ title }: { title: string }) {
  return (
    <div className="relative h-full w-full bg-amber-500 flex items-center justify-center">
      <div className="text-white text-xl font-bold text-center px-4">
        Fusion Focus
      </div>
    </div>
  );
}

async function getBlueprints() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/growth-blueprints`, {
      cache: 'no-cache' // Ensure we get fresh data
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data as GrowthBlueprint[];
  } catch (error) {
    console.error('Error fetching growth blueprints:', error);
    return [];
  }
}

export default async function GrowthBlueprintsPage() {
  const blueprints = await getBlueprints();

  return (
    <>
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-opensauce mb-6">
              Growth Blueprints
            </h1>
            <p className="text-lg text-muted-foreground">
              Free data-driven research and actionable strategies to help SaaS founders scale effectively.
              Explore our collection of growth blueprints designed to solve common challenges in SaaS business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {blueprints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blueprints.map((blueprint) => (
                <div key={blueprint.id} className="flex flex-col h-full bg-card border border-border/40 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 w-full">
                    {blueprint.image_url ? (
                      <Image
                        src={blueprint.image_url}
                        alt={blueprint.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <PlaceholderImage title={blueprint.title} />
                    )}
                    {blueprint.categories && blueprint.categories.length > 0 && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary">
                          {blueprint.categories[0]}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <div className="text-sm text-muted-foreground mb-2">
                      {formatDate(blueprint.created_at)}
                    </div>
                    <Link href={`/growth-blueprints/${blueprint.slug}`}>
                      <h2 className="text-xl font-semibold font-opensauce mb-3 hover:text-primary transition-colors">
                        {blueprint.title}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {blueprint.description}
                    </p>
                    
                    <Button asChild variant="link" className="p-0 group">
                      <Link href={`/growth-blueprints/${blueprint.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No growth blueprints available at the moment. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-opensauce mb-6">
              Need a Custom Growth Strategy?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team can help you develop a tailored growth strategy based on data-driven insights specific to your business.
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
    </>
  );
} 