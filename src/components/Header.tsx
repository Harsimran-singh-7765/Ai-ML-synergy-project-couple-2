import React, { useState } from 'react';
import { Menu, X, Heart, Timer, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CoupleNames } from '../types';

interface HeaderProps {
  timeLeft: number;
  coupleNames: CoupleNames;
}

export function Header({ timeLeft, coupleNames }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-pink-600 dark:text-pink-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">AI/ML Hub</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-pink-600 dark:text-pink-400">{coupleNames.partner1}</span>
              <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400 animate-pulse" />
              <span className="text-pink-600 dark:text-pink-400">{coupleNames.partner2}</span>
            </div>
            <div className="flex items-center space-x-2 bg-pink-100 dark:bg-pink-900 px-3 py-1 rounded-full">
              <Timer className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">
              Home
            </Link>
            <Link to="/#games" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">
              Games
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Link
              to="/"
              className="block py-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/#games"
              className="block py-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Games
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}