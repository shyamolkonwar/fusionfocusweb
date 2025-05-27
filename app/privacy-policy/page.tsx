import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy | Fusion Focus",
  description: "Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16 md:py-24">
      <SectionHeading
        title="Privacy Policy"
        description="Last updated: May 27, 2025"
      />

      <div className="prose prose-sm max-w-4xl mx-auto mt-8">
        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you fill out a form, 
          subscribe to our newsletter, or contact us. This may include your name, email address, 
          phone number, and any other information you choose to provide.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Send you technical notices, updates, and support messages</li>
          <li>Communicate with you about products, services, and promotions</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not share your personal information with third parties except:
        </p>
        <ul>
          <li>With your consent</li>
          <li>For legal compliance and protection</li>
          <li>With service providers who assist us in our operations</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your 
          personal information against unauthorized access, alteration, or destruction.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes 
          by posting the new Privacy Policy on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <address className="not-italic">
          Fusion Focus<br />
          office@fusionfocus.in<br />
          +91 9394608300
        </address>
      </div>
    </main>
  );
}