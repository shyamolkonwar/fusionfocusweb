import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight 
} from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Growth Blueprints", href: "/growth-blueprints" },
      // { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Research Insights", href: "/blog" },
      { name: "Growth Blueprints", href: "/growth-blueprints" },
      { name: "FAQs", href: "/faqs" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/fusion-focus-agency/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/fsnfocus", label: "Twitter" },
  // { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/fsnfocus/", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand and Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h2 className="text-xl md:text-2xl font-bold text-primary">
                <span className="font-opensauce">Fusion Focus</span>
              </h2>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Empowering SaaS founders with data-driven market research and actionable insights for strategic growth.
            </p>
            
            <div className="mt-6">
              <h3 className="font-opensauce font-semibold mb-2">Subscribe to our newsletter</h3>
              <div className="flex gap-2 mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-background text-foreground border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="flex items-center gap-1">
                  Subscribe <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-opensauce font-semibold mb-4 text-foreground">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Information */}
          <div>
            <h3 className="font-opensauce font-semibold mb-4 text-foreground">
              Contact Us
            </h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>Rotary Road</p>
              <p>Dibrugarh, Assam, India</p>
              <p className="mt-4">
                <a href="mailto:office@fusionfocus.in" className="hover:text-primary transition-colors duration-200">
                  office@fusionfocus.in
                </a>
              </p>
              <p>
                <a href="tel:+919394608300" className="hover:text-primary transition-colors duration-200">
                  +91 9394608300
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-6 border-t border-muted flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Fusion Focus. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}