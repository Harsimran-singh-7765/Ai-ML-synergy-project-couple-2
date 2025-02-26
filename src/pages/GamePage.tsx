import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader, ExternalLink, Users } from 'lucide-react';
import { games } from '../data/games';

export function GamePage() {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === id);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
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

  const getEmbedUrl = () => {
    if (game.type === 'scratch') {
      return `https://scratch.mit.edu/projects/${game.projectId}/embed`;
    }
    if (game.type === 'gameflare') {
      return `https://gameflare.com/embed/${game.projectId}`;
    }
    return `https://games.crazygames.com/en_US/embed-${game.projectId}`;
  };

  const getGameUrl = () => {
    if (game.type === 'scratch') {
      return `https://scratch.mit.edu/projects/${game.projectId}`;
    }
    if (game.type === 'gameflare') {
      return `https://gameflare.com/game/${game.projectId}`;
    }
    return `https://www.crazygames.com/game/${game.projectId}`;
  };

  const handleGameLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleGameError = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  const handleJoinGame = () => {
    window.open('https://www.gameflare.com/embed/fireboy-and-watergirl-forest-temple', '_blank');
  };

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
          {isLoading && !loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
              <div className="text-center">
                <Loader className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Loading game...</p>
              </div>
            </div>
          )}
          
          {loadError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
              <div className="text-center p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Unable to load the game here
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Don't worry! You can still play the game on the official website.
                </p>
                <a
                  href={getGameUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Play on {game.type === 'gameflare' ? 'GameFlare' : 'Official Site'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ) : (
            <iframe
              src={getEmbedUrl()}
              allowtransparency="true"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              title={game.title}
              onLoad={handleGameLoad}
              onError={handleGameError}
              style={{ visibility: isLoading ? 'hidden' : 'visible' }}
            />
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {game.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                by {game.author}
              </p>
            </div>
            {game.id === '1' && ( // Only show for Fireboy and Watergirl
              <button
                onClick={handleJoinGame}
                className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Users className="w-5 h-5 mr-2" />
                Join Game
              </button>
            )}
          </div>

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