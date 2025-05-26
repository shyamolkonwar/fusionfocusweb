"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, MessageSquare, Laptop, Award, Building } from "lucide-react";
import { useInView } from "framer-motion";

export function GrowthBlueprintsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Example founder stories and real-world projects
  const founderStories = [
    {
      title: "Founder Interviews",
      description: "In-depth conversations with successful SaaS founders about their growth journeys",
      icon: <MessageSquare className="h-6 w-6 text-primary" />
    },
    {
      title: "Case Studies",
      description: "Detailed analysis of real SaaS companies that achieved product-market fit",
      icon: <Building className="h-6 w-6 text-primary" />
    },
    {
      title: "Project Breakdowns",
      description: "Technical and strategic breakdown of real-world SaaS products and features",
      icon: <Laptop className="h-6 w-6 text-primary" />
    },
    {
      title: "Success Stories",
      description: "How founders overcame challenges and scaled their SaaS businesses effectively",
      icon: <Award className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <section className="py-16 md:py-24" id="growth-blueprints">
      <div 
        className="container mx-auto px-4" 
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(20px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Side: Text and Button */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-opensauce mb-6">
              Real Growth Blueprints
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Get access to exclusive research with successful SaaS founders who share their authentic experiences, challenges, and strategies that led to their growth.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              We bring you real-world projects and case studies, not just theory. Learn directly from founders who've built and scaled successful SaaS businesses, with detailed breakdowns of their approaches and actionable takeaways you can apply immediately.
            </p>
            <Button 
              variant="default" 
              size="lg"
              className="group"
              onClick={() => window.open("https://growthblueprints.fusionfocus.io", "_blank")}
            >
              Access Growth Blueprints
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          {/* Right Side: Example Report Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {founderStories.map((story, index) => (
              <Card 
                key={index}
                className="border border-border/40 transition-all duration-500 hover:shadow-md"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isInView ? "none" : "translateY(15px)",
                  opacity: isInView ? 1 : 0,
                }}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    {story.icon}
                  </div>
                  <h3 className="text-lg font-semibold font-opensauce mb-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {story.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 