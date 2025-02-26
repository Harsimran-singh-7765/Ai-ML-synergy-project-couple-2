import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    if (retries > 0) {
      await sleep(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

// Create client only if both URL and key are available
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        fetch: async (url, options) => {
          try {
            const response = await fetchWithRetry(url, options || {});
            return response;
          } catch (err) {
            console.error('Supabase fetch error:', err);
            throw err;
          }
        }
      }
    })
  : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabase);
};

// Helper function to get connection status message
export const getConnectionStatus = () => {
  if (!supabaseUrl) return 'Supabase URL not configured. Please check your environment variables.';
  if (!supabaseAnonKey) return 'Supabase Anonymous Key not configured. Please check your environment variables.';
  if (!supabase) return 'Supabase client not initialized. Please check your configuration.';
  return 'connected';
};

// Helper function to test connection with retry logic
export const testConnection = async () => {
  if (!supabase) return false;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const { data, error } = await supabase.from('couples_log').select('count');
      if (!error) return true;
      await sleep(RETRY_DELAY);
    } catch (err) {
      console.error('Supabase connection test failed:', err);
      if (i === MAX_RETRIES - 1) return false;
      await sleep(RETRY_DELAY);
    }
  }
  return false;
};