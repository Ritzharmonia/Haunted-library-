import React from 'react';

interface GothicCandleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GothicCandle: React.FC<GothicCandleProps> = ({ size = 'md', className = '' }) => {
  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-125' : 'scale-100';

  return (
    <div className={`relative flex flex-col items-center select-none ${scale} ${className}`}>
      {/* Dancing pale mystic blue flame with desaturated glow */}
      <div className="relative w-5 h-8 -mb-1 animate-candle-flame">
        {/* Soft glowing ambient circle */}
        <div className="absolute inset-0 bg-slate-400/20 rounded-full blur-md" />
        {/* Stylized flame teardrop SVG */}
        <svg viewBox="0 0 24 36" fill="none" className="w-full h-full filter drop-shadow-[0_0_6px_rgba(148,163,184,0.6)]">
          <path
            d="M12 2C12 2 4 14 4 22C4 27.5 7.5 32 12 32C16.5 32 20 27.5 20 22C20 14 12 2 12 2Z"
            fill="#7DD3FC"
            opacity="0.85"
          />
          <path
            d="M12 12C12 12 7 18 7 24C7 27 9.2 29 12 29C14.8 29 17 27 17 24C17 18 12 12 12 12Z"
            fill="#E0F2FE"
          />
          <ellipse cx="12" cy="25" rx="2.5" ry="4" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Wick */}
      <div className="w-0.5 h-2 bg-slate-900" />

      {/* Stylized Candle Body with Wax Drips (Muted Slate / Pewter) */}
      <div className="relative w-5 h-12 bg-[#252A38] rounded-t-sm border border-slate-700/60 shadow-inner flex flex-col justify-start">
        {/* Whimsical wax drips */}
        <div className="w-1.5 h-4 bg-[#353D52] rounded-b-full ml-1" />
        <div className="w-1 h-2 bg-[#353D52] rounded-b-full ml-3 -mt-2" />
      </div>

      {/* Antique Pewter Stand with curl */}
      <div className="w-10 h-2 bg-[#171B26] rounded-sm border-t border-slate-600/50" />
      <div className="w-14 h-1.5 bg-[#10131C] rounded-full" />
    </div>
  );
};
