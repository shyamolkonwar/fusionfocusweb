import { MetadataRoute } from 'next';

// Set your base URL
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fusionfocus.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/unauthorized',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 