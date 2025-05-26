import { Metadata } from "next";
import { Service } from "@/types/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services | Market Research & Growth Strategy",
  description: "Comprehensive research and marketing solutions to help SaaS founders make data-driven decisions and accelerate growth.",
};

async function getServices(): Promise<Service[]> {
  try {
    // Create an absolute URL - this is required for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = new URL('/api/services', baseUrl);
    
    // Fetch services from the API route
    const response = await fetch(url, {
      cache: 'no-cache' // Ensure we get fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Placeholder component for services without images
function PlaceholderImage({ title }: { title: string }) {
  return (
    <div className="w-full h-full aspect-video bg-amber-500 flex items-center justify-center">
      <div className="text-white text-2xl font-bold text-center px-4">
        Fusion Focus
      </div>
    </div>
  );
}

export default async function ServicesPage() {
  const services = await getServices();
  
  if (!services || services.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6 font-opensauce">Our Services</h1>
        <p>No services found. Please check back later.</p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold font-opensauce mb-4">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive research and marketing solutions to help SaaS founders make data-driven decisions and accelerate growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:gap-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    {service.image_url ? (
                      <img 
                        src={service.image_url} 
                        alt={service.title} 
                        className="w-full h-auto aspect-video object-cover"
                      />
                    ) : (
                      <PlaceholderImage title={service.title} />
                    )}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-bold font-opensauce mb-4">
                    {service.title}
                  </h2>
                  <div 
                    className="prose prose-slate dark:prose-invert mb-6"
                    dangerouslySetInnerHTML={{ __html: service.description || '' }}
                  />
                  
                  {service.features && service.features.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <div className="mr-2 h-5 w-5 text-primary mt-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button asChild>
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-opensauce mb-6">
              Ready to Accelerate Your SaaS Growth?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our data-driven approach can help you make better decisions and achieve sustainable growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/growth-blueprints">
                  View Growth Blueprints
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 