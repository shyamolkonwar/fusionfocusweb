"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Zap } from "lucide-react";

export function NoCodeBlueprintCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
      <div 
        ref={ref}
        className="container mx-auto px-4 max-w-6xl"
      >
        <div className="relative rounded-2xl overflow-hidden bg-card shadow-lg border border-border/40 p-8 md:p-12">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Code2 className="w-8 h-8 text-primary" />
            </div>
            
            <h2 
              className="text-3xl md:text-4xl font-bold font-opensauce mb-4"
              style={{
                transform: isInView ? "none" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
                transition: "transform 0.7s ease, opacity 0.7s ease"
              }}
            >
              No-Code Friendly Growth Blueprints
            </h2>
            
            <p 
              className="text-lg text-muted-foreground mb-8"
              style={{
                transform: isInView ? "none" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
                transition: "transform 0.7s ease, opacity 0.7s ease",
                transitionDelay: "100ms"
              }}
            >
              Building your SaaS with no-code tools? Our growth blueprints are specifically designed to help no-code founders achieve product-market fit and sustainable growth.
            </p>
            
            <div 
              className="flex flex-wrap gap-4 justify-center mb-8"
              style={{
                transform: isInView ? "none" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
                transition: "transform 0.7s ease, opacity 0.7s ease",
                transitionDelay: "200ms"
              }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border/60">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Market Validation Strategies</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border/60">
                <Zap className="w-4 h-4 text-primary" />
                <span>No-Code Growth Tactics</span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              asChild
              style={{
                transform: isInView ? "none" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
                transition: "transform 0.7s ease, opacity 0.7s ease",
                transitionDelay: "300ms"
              }}
            >
              <Link href="/growth-blueprints">
                Get No-Code Growth Blueprints
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 