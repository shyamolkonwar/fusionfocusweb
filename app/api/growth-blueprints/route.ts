import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// This tells Next.js this is a dynamic route that shouldn't be statically optimized
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : undefined;
    
    const supabase = createServerSupabaseClient();
    
    let query = supabase
      .from('growth_blueprints')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
      
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching growth blueprints:', error);
      return NextResponse.json({ error: 'Failed to fetch growth blueprints' }, { status: 500 });
    }
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in growth blueprints API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 