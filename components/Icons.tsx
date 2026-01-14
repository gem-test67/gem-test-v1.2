
import React from 'react';

export const GemIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9.897 6.636a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L13.586 12 9.897 8.197a.75.75 0 0 1 0-1.561Z" />
  </svg>
);

export const GemAvatarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g opacity="0.8">
        {/* Outer rings */}
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5"/>
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
        
        {/* Face outline */}
        <path d="M70 50 C 70 30, 130 30, 130 50 L 140 100 C 140 130, 60 130, 60 100 Z" stroke="currentColor" strokeWidth="3" />
        
        {/* "Eyes" */}
        <path d="M80 70 C 85 65, 95 65, 100 70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M120 70 C 115 65, 105 65, 100 70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* "Mouth" */}
        <path d="M90 110 Q 100 115 110 110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        
        {/* Core */}
        <circle cx="100" cy="95" r="8" fill="currentColor" />
      </g>
    </svg>
  );

export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M10.5 18a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3z" />
    <path fillRule="evenodd" d="M12 2.25c-4.142 0-7.5 3.358-7.5 7.5 0 2.443 1.183 4.634 3.095 6.017a.75.75 0 0 1-.532 1.309A9 9 0 0 0 12 21a9 9 0 0 0 4.938-1.424.75.75 0 0 1-.532-1.309A6.983 6.983 0 0 0 19.5 9.75c0-4.142-3.358-7.5-7.5-7.5z" clipRule="evenodd" />
  </svg>
);

export const ThermometerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12 2.25c-.966 0-1.898.19-2.774.544a.75.75 0 0 0-.446 1.253l.09.155c.224.38.406.78.54 1.192S10 6.34 10 6.75v5.22c-1.38.623-2.5 1.94-2.5 3.53 0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.59-1.12-2.907-2.5-3.53V6.75c0-.41.047-.813.138-1.218.134-.412.316-.812.54-1.192l.09-.155a.75.75 0 0 0-.446-1.253A11.956 11.956 0 0 0 12 2.25zM8.5 15.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" clipRule="evenodd" />
    </svg>
);

export const MusicNoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 0 1 .75.75v11.25a3.75 3.75 0 1 1-5.25-2.016.75.75 0 0 1 .95-.55 2.25 2.25 0 0 0 4.3 1.016V3a.75.75 0 0 1 .75-.75Z" />
    </svg>
);

export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.538 0 3.286L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

export const PauseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 0-.75.75v12a.75.75 0 0 0 .75.75h2.25a.75.75 0 0 0 .75-.75v-12a.75.75 0 0 0-.75-.75H6.75zm8.25 0a.75.75 0 0 0-.75.75v12a.75.75 0 0 0 .75.75h2.25a.75.75 0 0 0 .75-.75v-12a.75.75 0 0 0-.75-.75H15z" clipRule="evenodd" />
    </svg>
);

export const ForwardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.75 5.25a.75.75 0 0 0-1.5 0v5.085L8.207 3.96a.75.75 0 0 0-1.207.63v14.82a.75.75 0 0 0 1.207.63l9.043-6.33V18.75a.75.75 0 0 0 1.5 0V5.25Z" />
    </svg>
);

export const EnterFullScreenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

export const ExitFullScreenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L3.75 3.75M9 9h4.5m-4.5 0v4.5m0-4.5L3.75 14.25M9 15l-5.25 5.25M9 15v-4.5m0 4.5h4.5m0 0l5.25 5.25M15 15l5.25-5.25M15 15v-4.5m0 4.5h-4.5m0 0L9 9.75" />
    </svg>
);