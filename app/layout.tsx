import './globals.css';
import type { Metadata } from 'next';
import { openSauce, montserrat } from './fonts';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: {
    default: 'Fusion Focus | All in one platform for SaaS Founders',
    template: '%s | Fusion Focus',
  },
  description: 'Empowering SaaS founders with data-driven market research, content marketing, and lead generation strategies.',
  keywords: ['market research', 'SaaS', 'content marketing', 'lead generation', 'software founders'],
  authors: [{ name: 'Fusion Focus' }],
  creator: 'Fusion Focus',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fusionfocus.in',
    title: 'Fusion Focus | All in one platform for SaaS Founders',
    description: 'Empowering SaaS founders with data-driven market research, content marketing, and lead generation strategies.',
    siteName: 'Fusion Focus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fusion Focus | All in one platform for SaaS Founders',
    description: 'Empowering SaaS founders with data-driven market research, content marketing, and lead generation strategies.',
    creator: '@fusionfocus',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSauce.variable} ${montserrat.variable} font-montserrat`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}