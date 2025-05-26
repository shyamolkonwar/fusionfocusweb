import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { GrowthBlueprintsSection } from "@/components/home/growth-blueprints-section";
import { BlueprintBenefitsSection } from "@/components/home/blueprint-benefits-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ContactSection } from "@/components/home/contact-section";
import { FounderSection } from "@/components/home/founder-section";
import { NoCodeBlueprintCTA } from "@/components/home/no-code-blueprint-cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <GrowthBlueprintsSection />
      <BlueprintBenefitsSection />
      <NoCodeBlueprintCTA />
      <ServicesSection />
      <FounderSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
    </>
  );
} 