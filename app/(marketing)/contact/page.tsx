import { Metadata } from "next";
import { ContactSection } from "@/components/home/contact-section";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch",
  description: "Contact Fusion Focus for SaaS market research, content marketing, and lead generation services. We're here to help your business grow.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-opensauce mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you. Get in touch with our team to discuss your SaaS research and marketing needs.
            </p>
          </div>
        </div>
      </section>
      
      <ContactSection />
      
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold font-opensauce mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border/40">
                <h3 className="text-xl font-semibold mb-3">What services do you offer?</h3>
                <p className="text-muted-foreground">
                  We provide a range of services including market research, content marketing, lead generation, and growth strategy consulting, all tailored specifically for SaaS businesses.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border/40">
                <h3 className="text-xl font-semibold mb-3">How long does it take to complete a research project?</h3>
                <p className="text-muted-foreground">
                  Project timelines vary based on scope and complexity. Typical market research projects take 3-6 weeks, while ongoing marketing campaigns are structured based on your business needs and goals.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border/40">
                <h3 className="text-xl font-semibold mb-3">Do you work with early-stage startups?</h3>
                <p className="text-muted-foreground">
                  Yes! We work with SaaS companies at all stages, from pre-launch startups to established businesses. We tailor our approach and pricing to fit your stage of growth and specific needs.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border/40">
                <h3 className="text-xl font-semibold mb-3">What makes your research different from other agencies?</h3>
                <p className="text-muted-foreground">
                  Our research is specifically focused on SaaS markets and customers. We combine quantitative data analysis with qualitative insights to provide a complete picture, and we emphasize actionable recommendations over theoretical findings.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border/40">
                <h3 className="text-xl font-semibold mb-3">How quickly can you respond to inquiries?</h3>
                <p className="text-muted-foreground">
                  We typically respond to all inquiries within 24 business hours. For urgent matters, please call our office directly or mark your email as "URGENT" in the subject line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 