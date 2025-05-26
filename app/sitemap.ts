import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase';

// Set your base URL
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fusionfocus.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Initialize base sitemap with static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ] as MetadataRoute.Sitemap;

  try {
    // Initialize Supabase client
    const supabase = createServerSupabaseClient();
    
    // Fetch published services
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('id, slug, updated_at')
      .eq('published', true);
    
    if (servicesError) {
      console.error('Error fetching services for sitemap:', servicesError);
    } else if (services) {
      // Add each service to the sitemap
      const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(service.updated_at || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
      
      staticRoutes.push(...serviceRoutes);
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return staticRoutes;
} 