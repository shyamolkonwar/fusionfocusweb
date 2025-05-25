import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const config = {
      supabaseUrl: supabaseUrl ? 'Configured' : 'Missing',
      supabaseAnonKey: supabaseAnonKey ? 'Configured' : 'Missing',
      nodeEnv: process.env.NODE_ENV || 'Not set',
    };
    
    return NextResponse.json({
      config,
      message: 'Configuration check completed'
    });
  } catch (error) {
    console.error('Error checking configuration:', error);
    
    return NextResponse.json(
      { error: 'Error checking configuration' },
      { status: 500 }
    );
  }
} 