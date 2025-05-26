import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// This tells Next.js this is a dynamic route that shouldn't be statically optimized
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    if (!slug) {
      console.error('Missing slug parameter');
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    
    console.log(`Fetching service with slug: ${slug}`);
    
    const supabase = createServerSupabaseClient();
    
    if (!supabase) {
      console.error('Failed to create Supabase client');
      return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }
    
    // Check if Supabase URL and key are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (error) {
      console.error(`Error fetching service with slug ${slug}:`, error);
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    if (!data) {
      console.error(`No data found for service with slug ${slug}`);
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    console.log(`Successfully retrieved service: ${data.title}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in service API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 