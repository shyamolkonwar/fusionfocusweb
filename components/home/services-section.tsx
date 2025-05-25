"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Users, 
  PenTool, 
  Megaphone,
  Target, 
  TrendingUp,
  ArrowRight,
  Loader2,
  LucideIcon
} from "lucide-react";
import { useInView } from "framer-motion";
import { Service } from "@/types/supabase";

// Define a type for our fallback service data
type FallbackService = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
  color: string;
  slug: string;
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
};

// Map of icons by service slug
const serviceIcons: Record<string, LucideIcon> = {
  'content-marketing': PenTool,
  'lead-generation': Target,
  'market-research': BarChart,
  'growth-strategy': TrendingUp,
  'default': Megaphone
};

// Map color classes by index
const colorClasses = [
  "border-l-chart-1",
  "border-l-chart-2",
  "border-l-chart-3", 
  "border-l-chart-4"
];

// Fallback services if data isn't available
const fallbackServices: FallbackService[] = [
  {
    icon: PenTool,
    title: "Content Marketing",
    description: "Create compelling content that engages your audience and builds brand authority. Our data-backed approach ensures your content resonates with your target users.",
    features: ["SEO-optimized blog content", "Whitepapers & case studies", "Email campaigns", "Social media strategy"],
    href: "/services/content-marketing",
    color: "border-l-chart-1",
    slug: "content-marketing",
    process: [
      {
        step: 1,
        title: "Strategy Development",
        description: "We develop a comprehensive content strategy aligned with your business goals."
      },
      {
        step: 2,
        title: "Content Planning",
        description: "We create a detailed content calendar based on keyword research and audience needs."
      },
      {
        step: 3,
        title: "Content Creation",
        description: "Our team produces high-quality content optimized for engagement and conversion."
      },
      {
        step: 4,
        title: "Distribution & Promotion",
        description: "We distribute content through the most effective channels for your audience."
      },
      {
        step: 5,
        title: "Analysis & Optimization",
        description: "We continuously monitor performance and optimize for better results."
      }
    ]
  },
  {
    icon: Target,
    title: "Lead Generation",
    description: "Drive high-quality leads with targeted campaigns specifically designed for SaaS companies. We identify and engage potential customers at every stage of the funnel.",
    features: ["Qualified lead targeting", "Conversion optimization", "Marketing automation", "Lead nurturing workflows"],
    href: "/services/lead-generation",
    color: "border-l-chart-2",
    slug: "lead-generation",
    process: [
      {
        step: 1,
        title: "Audience Analysis",
        description: "We identify your ideal customer profile and target audience segments."
      },
      {
        step: 2,
        title: "Channel Strategy",
        description: "We determine the most effective channels to reach your target audience."
      },
      {
        step: 3,
        title: "Campaign Development",
        description: "We create targeted campaigns designed to generate qualified leads."
      },
      {
        step: 4,
        title: "Implementation & Execution",
        description: "We execute campaigns across selected channels, optimizing as we go."
      },
      {
        step: 5,
        title: "Lead Nurturing & Conversion",
        description: "We develop systems to nurture leads through the sales funnel."
      }
    ]
  },
  {
    icon: BarChart,
    title: "Market Research",
    description: "Gain deep insights into your market with comprehensive research and competitor analysis. Understand trends, gaps, and opportunities within your niche.",
    features: ["Competitor analysis", "Market sizing", "User interviews", "Trend forecasting"],
    href: "/services/market-research",
    color: "border-l-chart-3",
    slug: "market-research",
    process: [
      {
        step: 1,
        title: "Scope Definition",
        description: "We work with you to define research objectives and key questions."
      },
      {
        step: 2,
        title: "Research Design",
        description: "We develop a tailored research methodology to address your specific needs."
      },
      {
        step: 3,
        title: "Data Collection",
        description: "We gather qualitative and quantitative data from multiple sources."
      },
      {
        step: 4,
        title: "Analysis & Insights",
        description: "We analyze data to uncover meaningful patterns and actionable insights."
      },
      {
        step: 5,
        title: "Strategic Recommendations",
        description: "We provide clear, actionable recommendations based on research findings."
      }
    ]
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Develop data-backed growth strategies that align with your business goals. Our experts help you identify the most effective channels for sustainable growth.",
    features: ["Channel optimization", "Pricing strategy", "Expansion planning", "Retention analysis"],
    href: "/services/growth-strategy",
    color: "border-l-chart-4",
    slug: "growth-strategy",
    process: [
      {
        step: 1,
        title: "Current State Analysis",
        description: "We analyze your current growth metrics and identify opportunities."
      },
      {
        step: 2,
        title: "Goal Setting",
        description: "We help define clear, measurable growth goals aligned with your vision."
      },
      {
        step: 3,
        title: "Strategy Development",
        description: "We create a customized growth strategy tailored to your business."
      },
      {
        step: 4,
        title: "Implementation Planning",
        description: "We develop a detailed roadmap for executing the growth strategy."
      },
      {
        step: 5,
        title: "Performance Monitoring",
        description: "We establish KPIs and monitoring systems to track progress."
      }
    ]
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoading(true);
        
        // Get published services, limited to 4
        const response = await fetch('/api/services');
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        setServices(data);
        console.log('Fetched services:', data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchServices();
  }, []);

  // Helper function to get icon for a service
  const getServiceIcon = (slug: string) => {
    return serviceIcons[slug] || serviceIcons.default;
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold font-opensauce mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive research and marketing solutions to help SaaS founders make data-driven decisions and accelerate growth.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.length > 0 ? (
              // Render actual services from database
              services.map((service, index) => {
                const IconComponent = getServiceIcon(service.slug);
                const colorClass = colorClasses[index % colorClasses.length];
                
                return (
                  <Card 
                    key={service.id}
                    className={cn(
                      "border-l-4 transition-all duration-700 h-full flex flex-col",
                      colorClass,
                      "hover:shadow-md hover:-translate-y-1"
                    )}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      transform: isInView ? "none" : "translateY(20px)",
                      opacity: isInView ? 1 : 0,
                    }}
                  >
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="font-opensauce text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-muted-foreground mt-2">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2">
                          {service.features.slice(0, 4).map((feature, i) => (
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
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full group">
                        <Link href={`/services/${service.slug}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              // Render fallback services
              fallbackServices.map((service, index) => (
                <Card 
                  key={service.slug}
                  className={cn(
                    "border-l-4 transition-all duration-700 h-full flex flex-col",
                    service.color,
                    "hover:shadow-md hover:-translate-y-1"
                  )}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transform: isInView ? "none" : "translateY(20px)",
                    opacity: isInView ? 1 : 0,
                  }}
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-opensauce text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
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
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full group">
                      <Link href={service.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}