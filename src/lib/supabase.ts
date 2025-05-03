
import { createClient } from '@supabase/supabase-js';

// For development fallbacks (these should be replaced with your actual Supabase project details)
const FALLBACK_URL = 'https://example.supabase.co';
const FALLBACK_KEY = 'your-public-anon-key';

// Get Supabase URL and anon key from environment variables or use fallbacks
// Important: Users should set the actual values in environment variables
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_KEY;

// Check if we have valid values
const isValidUrl = supabaseUrl && supabaseUrl !== FALLBACK_URL;
const isValidKey = supabaseAnonKey && supabaseAnonKey !== FALLBACK_KEY;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => isValidUrl && isValidKey;
