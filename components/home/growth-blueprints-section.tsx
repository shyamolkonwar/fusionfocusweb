"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, FileText } from "lucide-react";
import { useInView } from "framer-motion";
import { GrowthBlueprint } from "@/types/supabase";

export function GrowthBlueprintsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [blueprints, setBlueprints] = useState<GrowthBlueprint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch growth blueprints from API
  useEffect(() => {
    async function fetchBlueprints() {
      try {
        setIsLoading(true);
        
        // Get published blueprints, limited to 3
        const response = await fetch('/api/growth-blueprints?limit=3');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blueprints');
        }
        
        const data = await response.json();
        setBlueprints(data);
        console.log('Fetched blueprints:', data);
      } catch (error) {
        console.error('Failed to fetch growth blueprints:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchBlueprints();
  }, []);

  // Custom placeholder component for missing images
  const PlaceholderImage = ({ title }: { title: string }) => {
    return (
      <div className="relative h-full w-full bg-amber-500 flex items-center justify-center">
        <div className="text-white text-xl font-bold text-center px-4">
          Fusion Focus
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold font-opensauce mb-4">
              Growth Blueprints
            </h2>
            <p className="text-lg text-muted-foreground">
              Free data-driven research and actionable strategies to help SaaS founders scale effectively.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0 group">
            <Link href="/growth-blueprints">
              View All Blueprints
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : blueprints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blueprints.map((blueprint, index) => (
              <Card 
                key={blueprint.id}
                className="overflow-hidden border border-border/40 transition-all duration-700 hover:shadow-lg"
                style={{
                  transitionDelay: `${index * 150}ms`,
                  transform: isInView ? "none" : "translateY(20px)",
                  opacity: isInView ? 1 : 0,
                }}
              >
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
                  <Badge 
                    className="absolute top-4 left-4"
                    variant="secondary"
                  >
                    {blueprint.categories?.[0] || "General"}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <Link href={`/growth-blueprints/${blueprint.slug}`}>
                    <h3 className="text-xl font-semibold font-opensauce mb-2 hover:text-primary transition-colors">
                      {blueprint.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-4">
                    {blueprint.description}
                  </p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button asChild variant="link" className="p-0 h-auto group">
                    <Link href={`/growth-blueprints/${blueprint.slug}`} className="flex items-center">
                      Access Blueprint
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No blueprints available yet</h3>
            <p className="text-muted-foreground">
              Check back soon for data-driven growth blueprints to help your SaaS business grow.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 