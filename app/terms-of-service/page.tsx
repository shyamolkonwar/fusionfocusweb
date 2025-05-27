import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Terms of Service | Fusion Focus",
  description: "Terms and conditions governing your use of our services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto px-4 py-16 md:py-24">
      <SectionHeading
        title="Terms of Service"
        description="Last updated: May 27, 2025"
      />

      <div className="prose prose-sm max-w-4xl mx-auto mt-8">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using our services, you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use our services.
        </p>

        <h2>2. Services Provided</h2>
        <p>
          Fusion Focus provides market research and growth strategy services for SaaS businesses.
          We reserve the right to modify or discontinue any service at any time without notice.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>
          You agree to:
        </p>
        <ul>
          <li>Provide accurate and complete information when using our services</li>
          <li>Use our services only for lawful purposes</li>
          <li>Not interfere with or disrupt the services or servers</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content and materials provided through our services, including reports, research,
          and documentation, are the property of Fusion Focus and protected by copyright laws.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          Fusion Focus shall not be liable for any indirect, incidental, special, or consequential
          damages resulting from the use or inability to use our services.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We may modify these terms at any time. Your continued use of our services after changes
          constitutes acceptance of the modified terms.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of India.
        </p>

        <h2>8. Contact Information</h2>
        <p>
          For any questions about these Terms of Service, please contact us at:
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