import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

export function ThemeToggle({ isDark, toggle }: Theme) {
  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
}