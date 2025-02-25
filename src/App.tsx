import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { ThemeToggle } from './components/ThemeToggle';
import { Home } from './pages/Home';
import { GamePage } from './pages/GamePage';
import { Login } from './components/Login';
import { settings } from './config/settings';
import { CoupleNames } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabase';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.auth.sessionTimeout);
  const [coupleNames, setCoupleNames] = useState<CoupleNames>({ partner1: '', partner2: '' });

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAuthenticated) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsAuthenticated(false);
            return settings.auth.sessionTimeout;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(settings.auth.sessionTimeout);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAuthenticated]);

  const handleLogin = async (password: string, partner1: string, partner2: string) => {
    if (password === settings.auth.password) {
      setIsAuthenticated(true);
      setCoupleNames({ partner1, partner2 });
      setTimeLeft(settings.auth.sessionTimeout);

      if (isSupabaseConfigured()) {
        try {
          // Try to find existing couple
          const { data: existingCouple, error: selectError } = await supabase!
            .from('couples_log')
            .select('*')
            .eq('partner1', partner1)
            .eq('partner2', partner2)
            .maybeSingle();

          if (selectError) throw selectError;

          if (existingCouple) {
            // Update existing couple
            const { error: updateError } = await supabase!
              .from('couples_log')
              .update({
                last_login: new Date().toISOString(),
                login_count: existingCouple.login_count + 1
              })
              .eq('id', existingCouple.id);

            if (updateError) throw updateError;
          } else {
            // Create new couple entry
            const { error: insertError } = await supabase!
              .from('couples_log')
              .insert([{ 
                partner1, 
                partner2,
                login_count: 1,
                last_login: new Date().toISOString()
              }]);

            if (insertError) throw insertError;
          }
        } catch (error) {
          console.error('Error updating couples log:', error);
        }
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-pink-50 dark:bg-pink-900 transition-colors duration-200 ${isDark ? 'dark' : ''}`}>
        <ThemeToggle isDark={isDark} toggle={toggleTheme} />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <Router>
      <div className={`min-h-screen bg-pink-50 dark:bg-pink-900 transition-colors duration-200 ${isDark ? 'dark' : ''}`}>
        <Header timeLeft={timeLeft} coupleNames={coupleNames} />
        <ThemeToggle isDark={isDark} toggle={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home coupleNames={coupleNames} />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;