import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { type Database } from '@/types/database';
import { createServerSupabaseClient } from './supabase';

export async function getSession() {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function getCurrentUser() {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function isUserAdmin() {
  const session = await getSession();
  
  if (!session?.user) {
    return false;
  }
  
  const supabase = createServerSupabaseClient();
  
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', session.user.email)
      .single();
      
    if (error || !data) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
} 