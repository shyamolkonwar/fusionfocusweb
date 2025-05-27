import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/database';

export async function middleware(req: NextRequest) {
  // Create a Supabase client configured to use cookies
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Return the response
  return res;
}

// Empty matcher as admin routes have been removed
export const config = {
  matcher: [],
}; 