import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";

// Define interfaces for type safety
interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServiceOffering {
  title: string;
  description: string;
  icon: string;
}

interface Service {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  heroImage?: string;
  image_url?: string;
  benefits?: string[];
  offerings?: ServiceOffering[];
  process?: ProcessStep[];
  features?: string[];
  content?: string;
}

type ServiceParams = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  try {
    // Create an absolute URL - this is required for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL('/api/services', baseUrl);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch services for static params: ${response.status}`);
      // Return empty array to avoid build errors, pages will be generated on-demand
      return [];
    }
    
    const services = await response.json();
    
    if (!Array.isArray(services) || services.length === 0) {
      console.warn("No services found or invalid response format for static generation");
      return [];
    }
    
    return services.map((service: Service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    // Return empty array to avoid build errors, pages will be generated on-demand
    return [];
  }
}

// Get service data from API
async function getServiceData(slug: string): Promise<Service | null> {
  try {
    // Create an absolute URL - this is required for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL(`/api/services/${slug}`, baseUrl);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour instead of no-cache
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch service data for slug ${slug}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    // Validate that we got a proper service object
    if (!data || typeof data !== 'object' || !data.title) {
      console.error(`Invalid service data received for slug ${slug}`);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: ServiceParams): Promise<Metadata> {
  const service = await getServiceData(params.slug);
  
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }
  
  return {
    title: `${service.title} | Fusion Focus`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServiceParams) {
  const service = await getServiceData(params.slug);
  
  if (!service) {
    notFound();
  }
  
  // Default data for missing fields
  const defaultProcess: ProcessStep[] = [
    { step: 1, title: "Consultation", description: "We start with a thorough consultation to understand your needs" },
    { step: 2, title: "Strategy Development", description: "We develop a customized strategy based on your goals" },
    { step: 3, title: "Implementation", description: "Our team implements the strategy with regular updates" },
    { step: 4, title: "Analysis & Optimization", description: "We measure results and optimize for better performance" }
  ];
  
  const defaultBenefits = [
    "Data-driven decision making",
    "Customized strategies for your business",
    "Expert team with SaaS experience",
    "Measurable results and continuous improvement"
  ];
  
  return (
    <div className="pt-16 pb-24">
      {/* Hero Section - Now just using gradient background */}
      <div className="relative h-80 md:h-96 bg-gradient-to-r from-primary/80 to-primary/50">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center z-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold font-opensauce text-white mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {service.description}
          </p>
        </div>
      </div>
      
      {/* Overview Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="Overview"
            align="left"
            size="md"
          />
          
          {service.content ? (
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          ) : (
            <p className="text-lg text-muted-foreground mb-8">
              {service.longDescription || service.description}
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-card rounded-xl p-6 border border-border/40">
              <h3 className="text-xl font-semibold font-opensauce mb-6">Key Benefits</h3>
              <ul className="space-y-4">
                {(service.benefits || service.features || defaultBenefits).map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 h-5 w-5 text-primary mt-1">
                      <Check className="h-5 w-5" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold font-opensauce mb-6">Our Process</h3>
              <div className="space-y-4">
                {(service.process || defaultProcess).map((processStep) => (
                  <div key={processStep.step} className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="font-semibold text-primary">{processStep.step}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{processStep.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{processStep.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Offerings - Only show if offerings are available */}
      {service.offerings && service.offerings.length > 0 && (
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              title={`Our ${service.title} Services`}
              description="Comprehensive solutions tailored to your specific needs"
              size="md"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {service.offerings.map((offering, index) => (
                <Card key={index} className="border border-border/40">
                  <CardHeader className="pb-2">
                    <div className="text-3xl mb-4">{offering.icon}</div>
                    <CardTitle className="font-opensauce">{offering.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{offering.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold font-opensauce mb-4">
            Ready to get started with our {service.title} services?
          </h2>
          <p className="mb-6">
            Contact us today to discuss your specific needs and how we can help your SaaS business grow.
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="secondary"
            className="text-primary"
          >
            <Link href="/contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

async function getAllServices() {
  try {
    // Create an absolute URL - this is required for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL('/api/services', baseUrl);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching all services:', error);
    return [];
  }
}

async function getServiceBySlug(slug: string) {
  try {
    // Create an absolute URL - this is required for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL(`/api/services/${slug}`, baseUrl);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
} 