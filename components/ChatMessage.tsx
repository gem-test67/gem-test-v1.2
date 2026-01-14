
import React from 'react';
import { Message, Role } from '../types';
import { GemIcon, UserIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isGem = message.role === Role.GEM;
  
  // Extract emotion tag and the rest of the message
  let emotion = 'NEUTRAL';
  let displayContent = message.content;
  const match = message.content.match(/^\[([A-Z]+)\]\s*/);

  if (isGem && match) {
    emotion = match[1];
    displayContent = message.content.substring(match[0].length);
  }

  const avatar = isGem ? (
    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
      <GemIcon className="w-6 h-6 text-white" />
    </div>
  ) : (
    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
      <UserIcon className="w-6 h-6 text-white" />
    </div>
  );

  const messageBubbleClasses = isGem
    ? 'bg-gray-800 text-purple-200'
    : 'bg-blue-600 text-white';

  const containerClasses = `flex items-start gap-4 ${isGem ? '' : 'flex-row-reverse'}`;
  
  // Simple markdown-like rendering for newlines
  const formattedContent = displayContent.split('\n').map((line, index) => (
    <p key={index}>{line}</p>
  ));

  return (
    <div className={containerClasses}>
      {avatar}
      <div className={`max-w-xl rounded-xl p-4 shadow-md ${messageBubbleClasses}`}>
        <div className="prose prose-invert prose-sm text-white">
          {formattedContent}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
