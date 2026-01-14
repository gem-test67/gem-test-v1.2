import React, { useState, KeyboardEvent } from 'react';
import { SendIcon } from './Icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  variant?: 'default' | 'overlay';
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, variant = 'default' }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (variant === 'overlay') {
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              disabled={isLoading}
              rows={1}
              className="flex-1 p-2 bg-transparent border border-gray-600 rounded-md resize-none focus:ring-1 focus:ring-purple-400 focus:outline-none transition-all duration-200 disabled:opacity-50 text-sm text-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-purple-600 rounded-md text-white hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 focus:ring-1 focus:ring-purple-400 focus:outline-none"
              aria-label="Send message"
            >
              <SendIcon className="w-5 h-5" />
            </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Talk to Gem..."
        disabled={isLoading}
        rows={1}
        className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="p-3 bg-purple-600 rounded-full text-white hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        aria-label="Send message"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default ChatInput;