import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('growth_blueprints')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (error) {
      console.error('Error fetching growth blueprint:', error);
      return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in growth blueprint API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 