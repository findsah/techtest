'use client';

import { useEffect, useState } from 'react';

/**
 * Game interface - matches the backend API response structure
 */
interface Game {
  id: number;
  name: string;
  developer: string;
  platform: string;
  releaseYear: number;
  rating: number;
}

/**
 * GamesPage Component
 * 
 * Handles three states:
 * 1. Loading - displays a spinner/skeleton while fetching data
 * 2. Error - displays user-friendly error message
 * 3. Success - displays the games list
 */
export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Fetch games from the backend API
   * Handles loading, success, and error states
   */
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);

        const query = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
        const response = await fetch(`http://localhost:5000/api/games${query}`);

        if (!response.ok) {
          throw new Error(`Failed to load game data. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error('Invalid response from server');
        }

        setGames(data.data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Failed to load game data. Please refresh the page. (${errorMessage})`);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Games Library</h1>
          <p className="text-slate-300">Browse and search our collection of games</p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search games by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              {/* Spinner */}
              <div className="inline-block">
                <div className="relative w-12 h-12 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-600"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                </div>
              </div>
              <p className="text-white text-lg">Loading games...</p>
              <p className="text-slate-400 text-sm mt-2">Please wait while we fetch the data</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-red-600 text-2xl">⚠️</div>
              <h2 className="text-red-800 text-lg font-semibold">Error Loading Games</h2>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
            >
              Refresh Page
            </button>
          </div>
        )}

        {/* SUCCESS STATE - Games List */}
        {!loading && !error && (
          <>
            {games.length > 0 ? (
              <>
                <p className="text-slate-300 mb-6">Found {games.length} game(s)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {games.map((game) => (
                    <div
                      key={game.id}
                      className="bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                          {game.name}
                        </h3>
                        <div className="space-y-2 text-slate-300 text-sm">
                          <p>
                            <span className="font-semibold text-slate-200">Developer:</span>{' '}
                            {game.developer}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-200">Platform:</span>{' '}
                            {game.platform}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-200">Release Year:</span>{' '}
                            {game.releaseYear}
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-semibold text-slate-200">Rating:</span>
                            <span className="text-yellow-400 font-bold">{game.rating}/10</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-slate-700 rounded-lg p-8 text-center">
                <p className="text-slate-300 text-lg">No games found matching your search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
