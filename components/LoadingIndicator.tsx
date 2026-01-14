
import React from 'react';
import { GemIcon } from './Icons';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
        <GemIcon className="w-6 h-6 text-white" />
      </div>
      <div className="max-w-xl rounded-xl p-4 shadow-md bg-gray-800 flex items-center space-x-2">
        <div className="w-2.5 h-2.5 bg-purple-300 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 bg-purple-300 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 bg-purple-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
