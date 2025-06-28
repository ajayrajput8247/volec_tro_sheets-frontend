
import React from 'react';

const ElectronicsBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none max-w-full">

    <div className="absolute top-20 left-20 float-animation">
  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full border-2 border-blue-500/40" />
</div>

<div className="absolute top-32 right-10 sm:top-40 sm:right-32 float-animation float-delay-1">
  <div className="w-4 h-10 sm:w-6 sm:h-12 bg-green-500/20 rounded border-2 border-green-500/40" />
</div>

<div className="absolute bottom-24 left-10 sm:bottom-32 sm:left-40 float-animation float-delay-2">
  <div className="w-8 h-3 sm:w-10 sm:h-4 bg-orange-500/20 rounded-full border-2 border-orange-500/40" />
</div>

<div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 float-animation">
  <div className="w-10 h-6 sm:w-12 sm:h-8 bg-purple-500/20 rounded border-2 border-purple-500/40" />
</div>

      
      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M50 100 Q 200 50 350 100 T 650 100"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M100 200 Q 300 150 500 200 T 800 200"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </svg>
    </div>
  );
};

export default ElectronicsBackground;
