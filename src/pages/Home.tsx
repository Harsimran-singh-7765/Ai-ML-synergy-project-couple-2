import React from 'react';
import { GameCard } from '../components/GameCard';
import { games } from '../data/games';
import { ArrowRight, Heart, Brain, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CoupleNames } from '../types';
import { CouplesLog } from '../components/CouplesLog';

interface HomeProps {
  coupleNames: CoupleNames;
}

export function Home({ coupleNames }: HomeProps) {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <div className="h-full w-full flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 opacity-20">
              {[...Array(9)].map((_, i) => (
                <Brain
                  key={i}
                  className="w-24 h-24 text-white transform rotate-45 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-white mr-4" />
            <h2 className="text-2xl text-white font-semibold">AI/ML Love Hub</h2>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {coupleNames.partner1} & {coupleNames.partner2}'s Love Games
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Experience love through the lens of artificial intelligence
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="#games"
              className="inline-flex items-center px-6 py-3 bg-white text-pink-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Play Together
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <Brain className="w-8 h-8 mr-2 text-pink-600" />
            AI-Powered Love Games
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Special games for {coupleNames.partner1} & {coupleNames.partner2} enhanced by artificial intelligence
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {games.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </section>

      {/* Couples Log Section */}
      <CouplesLog />
    </div>
  );
}