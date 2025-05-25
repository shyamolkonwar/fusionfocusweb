import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/database';

export async function middleware(req: NextRequest) {
  // Create a Supabase client configured to use cookies
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh the session if it exists
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there's no session and the request is for an admin route, redirect to login
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    // Exclude the login page from the redirect
    if (req.nextUrl.pathname.startsWith('/admin/login')) {
      return res;
    }

    const redirectUrl = new URL('/admin/login', req.url);
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If there is a session, but the user tries to access the login page, redirect to dashboard
  if (session && req.nextUrl.pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  // Check if user is admin for admin routes
  if (session && req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login')) {
    try {
      // Query to check if the user is an admin
      const { data: adminData, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', session.user.email)
        .single();
      
      if (error || !adminData) {
        // User is not an admin, redirect to unauthorized page
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    } catch (error) {
      console.error('Error checking admin status in middleware:', error);
      // If there's an error, redirect to unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return res;
}

// Specify which routes this middleware should run for
export const config = {
  matcher: [
    '/admin/:path*',
  ],
}; 