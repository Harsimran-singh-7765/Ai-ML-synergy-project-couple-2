import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { games } from '../data/games';

export function GamePage() {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when game changes
    setIsLoading(true);
  }, [id]);

  if (!game) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Game not found
          </h2>
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const embedUrl = `https://scratch.mit.edu/projects/${game.projectId}/embed`;

  return (
    <div className="min-h-screen pt-16 container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="aspect-video w-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
              <div className="text-center">
                <Loader className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Loading game...</p>
              </div>
            </div>
          )}
          <iframe
            src={embedUrl}
            allowtransparency="true"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            title={game.title}
            onLoad={() => setIsLoading(false)}
            style={{ visibility: isLoading ? 'hidden' : 'visible' }}
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {game.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            by {game.author}
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {game.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                How to Play
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {game.instructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}