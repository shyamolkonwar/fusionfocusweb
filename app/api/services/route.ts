import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// This tells Next.js this is a dynamic route that shouldn't be statically optimized
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if Supabase URL and key are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }
    
    const supabase = createServerSupabaseClient();
    
    if (!supabase) {
      console.error('Failed to create Supabase client');
      return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('published', true);
    
    if (error) {
      console.error('Error fetching services:', error);
      return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
    
    // If no services found, return an empty array instead of null
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in services API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 