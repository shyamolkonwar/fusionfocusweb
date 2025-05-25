"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "framer-motion";

const testimonials = [
  {
    quote: "The market research insights from DataScope helped us identify a completely untapped segment in our industry. Within six months of repositioning, we saw a 40% increase in qualified leads.",
    author: "Sarah Johnson",
    role: "CEO, FinanceFlow",
    company: "FinanceFlow",
  },
  {
    quote: "Their content marketing strategy completely transformed how we communicate with our audience. We're now seeing 3x the engagement and a significant boost in organic traffic.",
    author: "Michael Chen",
    role: "Marketing Director",
    company: "HealthSync",
  },
  {
    quote: "DataScope's lead generation campaigns exceeded our expectations. Their data-driven approach helped us cut customer acquisition costs by 30% while improving lead quality.",
    author: "Alex Rodriguez",
    role: "Growth Lead",
    company: "EdTechPro",
  },
  {
    quote: "Working with DataScope gave us the competitive intelligence we needed to successfully enter a crowded market. Their insights directly influenced our product roadmap for the better.",
    author: "Jamie Williams",
    role: "Product Manager",
    company: "CloudSecure",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div 
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-700"
          style={{
            transform: isInView ? "none" : "translateY(20px)",
            opacity: isInView ? 1 : 0,
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-opensauce mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what SaaS founders have to say about working with DataScope Research.
          </p>
        </div>

        <div 
          className="transition-all duration-700 delay-200"
          style={{
            transform: isInView ? "none" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
          }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Card className="border border-border/40 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-yellow-500 inline-block"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <blockquote className="text-foreground italic mb-6 flex-grow">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static mx-2 translate-y-0" />
              <CarouselNext className="static mx-2 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}