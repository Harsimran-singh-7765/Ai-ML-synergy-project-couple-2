import React, { useState, useEffect } from 'react';
import { Heart, Users, Timer, AlertCircle } from 'lucide-react';
import { settings } from '../config/settings';
import { supabase, isSupabaseConfigured, getConnectionStatus } from '../lib/supabase';

interface LoginProps {
  onLogin: (password: string, partner1: string, partner2: string) => void;
}

interface Stats {
  totalCouples: number;
  totalVisits: number;
  recentCouples: Array<{ partner1: string; partner2: string; last_login: string }>;
}

export function Login({ onLogin }: LoginProps) {
  const [password, setPassword] = useState('');
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState('');
  const [stats, setStats] = useState<Stats>({
    totalCouples: 0,
    totalVisits: 0,
    recentCouples: []
  });

  useEffect(() => {
    const checkConnection = async () => {
      setLoading(true);
      if (!isSupabaseConfigured()) {
        setConnectionError(getConnectionStatus());
        setLoading(false);
        return;
      }

      try {
        const { error } = await supabase!.from('couples_log').select('count');
        if (error) throw error;
        setConnectionError('');
        await fetchStats();
      } catch (err) {
        console.error('Connection error:', err);
        setConnectionError('Unable to connect to the database. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  const fetchStats = async () => {
    if (!isSupabaseConfigured()) return;

    try {
      // Get total couples and visits
      const { data: statsData, error: statsError } = await supabase!
        .from('couples_log')
        .select('login_count');
      
      if (statsError) throw statsError;

      const totalCouples = statsData?.length || 0;
      const totalVisits = statsData?.reduce((sum, couple) => sum + (couple.login_count || 0), 0) || 0;

      // Get recent couples
      const { data: recentData, error: recentError } = await supabase!
        .from('couples_log')
        .select('partner1, partner2, last_login')
        .order('last_login', { ascending: false })
        .limit(3);

      if (recentError) throw recentError;

      setStats({
        totalCouples,
        totalVisits,
        recentCouples: recentData || []
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setConnectionError('Error loading statistics. Please try again later.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === settings.auth.password) {
      onLogin(password, partner1, partner2);
      setError(false);
    } else {
      setError(true);
    }
  };

  const renderStatsPanel = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
        </div>
      );
    }

    if (connectionError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <AlertCircle className="w-12 h-12 text-pink-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Connection Issue
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {connectionError}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Don't worry! You can still log in and play games.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900">
            <Users className="h-6 w-6 text-pink-600 dark:text-pink-400" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Love Statistics
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join our growing community of love
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pink-50 dark:bg-pink-900/50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                {stats.totalCouples}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Couples
              </div>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                {stats.totalVisits}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Visits
              </div>
            </div>
          </div>

          <div className="bg-pink-50 dark:bg-pink-900/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Love Stories
            </h3>
            <div className="space-y-3">
              {stats.recentCouples.map((couple, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 dark:text-white">
                      {couple.partner1}
                    </span>
                    <Heart className="w-3 h-3 text-pink-600 dark:text-pink-400" />
                    <span className="text-gray-900 dark:text-white">
                      {couple.partner2}
                    </span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {new Date(couple.last_login).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-pink-50 dark:bg-pink-900">
      <div className="max-w-4xl w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900">
                <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                Our Love Story
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enter your names to begin your journey
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                <div className="w-full md:w-2/5">
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Partner 1's name"
                    value={partner1}
                    onChange={(e) => setPartner1(e.target.value)}
                  />
                </div>
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400 animate-pulse" />
                </div>
                <div className="w-full md:w-2/5">
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Partner 2's name"
                    value={partner2}
                    onChange={(e) => setPartner2(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <input
                  type="password"
                  required
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    error ? 'border-red-300' : 'border-gray-300'
                  } dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Incorrect password. Please try again.
                </p>
              )}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Start Our Journey
                </button>
              </div>
            </form>
          </div>

          {/* Stats Panel */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            {renderStatsPanel()}
          </div>
        </div>
      </div>
    </div>
  );
}