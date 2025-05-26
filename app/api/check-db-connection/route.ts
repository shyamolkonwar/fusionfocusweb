import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// This tells Next.js this is a dynamic route that shouldn't be statically optimized
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Create Supabase client without cookies
    const supabase = createServerSupabaseClient();
    
    // Test query - get the count of admins
    const { count, error } = await supabase
      .from('admins')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      adminCount: count
    });
  } catch (error) {
    console.error('Unexpected error checking database connection:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred when checking database connection' },
      { status: 500 }
    );
  }
} 