import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client only if both URL and key are available
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabase);
};

// Helper function to get connection status message
export const getConnectionStatus = () => {
  if (!supabaseUrl) return 'Supabase URL not configured';
  if (!supabaseAnonKey) return 'Supabase Anonymous Key not configured';
  if (!supabase) return 'Supabase client not initialized';
  return 'connected';
};