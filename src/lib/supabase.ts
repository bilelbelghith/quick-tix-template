
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anonymous Key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
