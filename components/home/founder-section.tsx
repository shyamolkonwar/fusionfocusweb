"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, TwitterIcon, GlobeIcon } from "lucide-react";

export function FounderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          {/* Founder Image - Left Side */}
          <div 
            className="relative"
            style={{
              transform: isInView ? "none" : "translateX(-20px)",
              opacity: isInView ? 1 : 0,
              transition: "transform 0.7s ease, opacity 0.7s ease"
            }}
          >
            <div className="aspect-square max-w-md mx-auto md:mx-0 relative rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="https://media.licdn.com/dms/image/v2/D5603AQFz86d4B5_zxw/profile-displayphoto-shrink_800_800/B56ZP0HY7cHoAc-/0/1734967401488?e=1753920000&v=beta&t=OmYFyb8cpjviGzzUnf4njSsUo10vyBLIN_uVwZtY0R4" 
                alt="Shyamol Konwar - Founder of Fusion Focus" 
                width={500} 
                height={500}
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-primary/10 rounded-full hidden md:block" />
            <div className="absolute -top-6 -left-6 h-16 w-16 bg-primary/20 rounded-full hidden md:block" />
          </div>
          
          {/* Founder Bio - Right Side */}
          <div
            style={{
              transform: isInView ? "none" : "translateX(20px)",
              opacity: isInView ? 1 : 0,
              transition: "transform 0.7s ease, opacity 0.7s ease",
              transitionDelay: "150ms"
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-opensauce mb-4">
              Meet Our Founder
            </h2>
            <h3 className="text-xl text-primary font-medium mb-4">
              Shyamol Konwar
            </h3>
            <p className="text-muted-foreground mb-6">
              With over 3 years in the digital marketing space, I've observed a consistent pattern: SaaS businesses struggle with content marketing, lead generation, and achieving product-market fit. The rise of no-code tools has enabled non-technical founders to build SaaS products, but many face sustainability challenges because their solutions aren't aligned with market needs.
            </p>
            <p className="text-muted-foreground mb-8">
              My mission at Fusion Focus is to bridge this gap through comprehensive market research and data-driven growth strategies. I believe that successful SaaS businesses are built on deep customer insights, not just technical capabilities. By helping founders understand their market before scaling, we create sustainable growth pathways for innovative solutions.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-4 mb-6">
              <Button variant="outline" size="icon" asChild>
                <Link href="https://linkedin.com/in/shyamolkonwar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <LinkedinIcon className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://x.com/shyamol_konwar" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
                  <TwitterIcon className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://shyamol.space" target="_blank" rel="noopener noreferrer" aria-label="Personal Website">
                  <GlobeIcon className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <Button asChild>
              <Link href="/about">
                More About Our Vision
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 