"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, CodeIcon } from "lucide-react";
import { useInView } from "framer-motion";


const features = [
  {
    icon: BarChart3,
    title: "Data-Driven Research",
    description: "Comprehensive market analysis based on real-world data"
  },
  {
    icon: Users,
    title: "Target Audience Insights",
    description: "Deep understanding of your SaaS customers and their needs"
  },
  {
    icon: CodeIcon,
    title: "Vibe Code Friendly",
    description: "We make sure your growth strategies are compatible with no-code tools."
  }
];

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const scrollToBlueprintBenefits = () => {
    const section = document.getElementById('growth-blueprints');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/15),transparent)]" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-background shadow-xl shadow-primary/10 ring-1 ring-primary/5" />

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12 lg:items-center">
          <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-none">
            <div
              ref={ref}
              className="transition-all duration-700 delay-150"
              style={{
                transform: isInView ? "none" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
              }}
            >
              <p className="text-base font-semibold text-primary">
                Strategic Market Research
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-opensauce">
              Scale Your SaaS with Free{" "}
                <span className="text-primary">Data-Driven</span> Market Research Insights
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Read our free data driven research growth blueprints to get insights into the market.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Work with us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={scrollToBlueprintBenefits}
                >
                  Read Blueprints
                </Button>
              </div>
            </div>

            {/* Feature list */}
            <dl className="mt-12 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-3">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="transition-all duration-700"
                  style={{
                    transitionDelay: `${300 + index * 150}ms`,
                    transform: isInView ? "none" : "translateY(20px)",
                    opacity: isInView ? 1 : 0,
                  }}
                >
                  <dt className="text-base font-semibold leading-7 text-foreground flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero image or illustration */}
          <div 
            className="relative transition-all duration-1000 delay-300"
            style={{
              transform: isInView ? "none" : "translateY(40px)",
              opacity: isInView ? 1 : 0,
            }}
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/70 to-primary/30 overflow-hidden shadow-xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary/30 z-0"></div>
              <img
                src="https://i.ibb.co/GQzpkSCr/Leonardo-Phoenix-10-Create-a-futuristic-abstract-image-The-des-0.jpg"
                alt="Data visualization and analytics"
                className="h-full w-full object-cover relative z-10"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-2xl bg-accent p-2 shadow-lg flex items-center justify-center transform rotate-3 z-20">
              <div className="text-center">
                <div className="text-3xl font-bold font-opensauce text-primary">FREE</div>
                <div className="text-xs font-medium mt-1 text-muted-foreground">Growth Blueprints</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}