import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { GrowthBlueprintsSection } from "@/components/home/growth-blueprints-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <GrowthBlueprintsSection />
      <ServicesSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
    </>
  );
} 