import React, { useState } from 'react';
import { PlayIcon, PauseIcon, ForwardIcon } from './Icons';

interface YouTubeMusicControlsProps {
  onSendCommand: (command: string) => void;
  isLoading: boolean;
}

const YouTubeMusicControls: React.FC<YouTubeMusicControlsProps> = ({ onSendCommand, isLoading }) => {
  const [songName, setSongName] = useState('');

  const handlePlay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (songName.trim()) {
      onSendCommand(`Play the song "${songName}" on YouTube Music`);
    } else {
      onSendCommand('Play YouTube Music');
    }
    // setSongName(''); // Optional: clear input after sending
  };

  const handlePause = () => {
    onSendCommand('Pause YouTube Music');
  };

  const handleNext = () => {
    onSendCommand('Play next track on YouTube Music');
  };

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg mb-4">
      <h3 className="text-sm font-bold text-red-400 mb-3 tracking-wider">YOUTUBE MUSIC</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Play Song Form */}
        <form onSubmit={handlePlay} className="flex items-center gap-2 p-3 bg-gray-700/50 rounded-lg">
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            placeholder="Song name (optional)"
            disabled={isLoading}
            className="flex-1 min-w-0 p-1.5 bg-gray-800 border border-gray-600 rounded-md disabled:opacity-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
            aria-label="Song name"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 text-white bg-green-600 hover:bg-green-700 rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Play song"
          >
            <PlayIcon className="w-5 h-5" />
          </button>
        </form>
        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4 p-3 bg-gray-700/50 rounded-lg">
            <button
              onClick={handlePause}
              disabled={isLoading}
              className="p-2 text-white bg-yellow-600 hover:bg-yellow-700 rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              aria-label="Pause music"
            >
              <PauseIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              aria-label="Next track"
            >
              <ForwardIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default YouTubeMusicControls;