import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    
    // Get user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }
    
    // Check if user is an admin
    const { data: adminData, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', session.user.email)
      .single();
    
    if (error) {
      console.error('Error checking admin status:', error);
      return NextResponse.json({ isAdmin: false }, { status: 500 });
    }
    
    return NextResponse.json({ isAdmin: !!adminData });
  } catch (error) {
    console.error('Error in check-admin API route:', error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
} 