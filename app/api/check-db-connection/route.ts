import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database';

export async function GET() {
  try {
    // Create Supabase client with cookies
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
    
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