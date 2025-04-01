
import { createClient } from '@supabase/supabase-js';

// Try to get environment variables or use placeholders
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Create Supabase client with auth configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Session expires after 24 hours
    flowType: 'pkce',
  },
});

// Check if we're using placeholder values and log information
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase credentials not found in environment variables. ' +
    'Using placeholder values. Some features may not work properly. ' + 
    'Please set the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

export const generateUniqueSlug = async (baseName: string) => {
  // Convert name to slug format (lowercase, spaces to hyphens)
  let slug = baseName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  
  // Add a random suffix to make it unique (6 characters)
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  slug = `${slug}-${randomSuffix}`;
  
  return slug;
};
