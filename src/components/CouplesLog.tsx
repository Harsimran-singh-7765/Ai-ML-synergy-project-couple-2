import React from 'react';
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Brain, Heart } from 'lucide-react';

interface CoupleLog {
  id: string;
  partner1: string;
  partner2: string;
  created_at: string;
  login_count: number;
}

export function CouplesLog() {
  const [couples, setCouples] = useState<CoupleLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError('Database connection not configured. Please connect to Supabase first.');
      return;
    }
    fetchCouples();
  }, []);

  async function fetchCouples() {
    try {
      const { data, error } = await supabase!
        .from('couples_log')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCouples(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching couples:', err);
      setError('Unable to load couples log');
    }
  }

  if (error) {
    return (
      <div className="text-center py-12 text-pink-600 dark:text-pink-400">
        {error}
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-pink-50 to-white dark:from-pink-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center">
            <Brain className="w-6 h-6 mr-2 text-pink-600" />
            AI/ML Powered Love Stories
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our AI has witnessed these beautiful connections
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {couples.map((couple) => (
            <div
              key={couple.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-pink-600 dark:text-pink-400 font-medium">
                    {couple.partner1}
                  </span>
                  <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span className="text-pink-600 dark:text-pink-400 font-medium">
                    {couple.partner2}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Visits: {couple.login_count}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                First Visit: {new Date(couple.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}