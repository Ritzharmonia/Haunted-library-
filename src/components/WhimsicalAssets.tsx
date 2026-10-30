import React from 'react';

// Whimsical Tim Burton style animated Ghost character (Hand-crafted SVG, muted desaturated palette)
export const WhimsicalGhost: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 180
}) => {
  return (
    <div className={`relative inline-block select-none animate-ghost-bob ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
      >
        {/* Soft Muted Glow */}
        <circle cx="100" cy="100" r="85" fill="rgba(148,163,184,0.08)" filter="blur(16px)" />

        {/* Floating Wavy Body */}
        <path
          d="M60 90C55 50 80 25 105 25C135 25 155 50 150 95C146 130 158 155 142 170C128 183 120 162 108 168C95 174 88 185 75 180C62 175 66 155 60 140C54 125 58 105 60 90Z"
          fill="#D4D7E3"
          stroke="#262A3B"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Patch details on body */}
        <rect x="75" y="130" width="15" height="15" rx="2" fill="#9AA1B8" stroke="#262A3B" strokeWidth="1.8" transform="rotate(-8 75 130)" />
        <line x1="72" y1="134" x2="77" y2="132" stroke="#262A3B" strokeWidth="1.8" />
        <line x1="91" y1="140" x2="95" y2="139" stroke="#262A3B" strokeWidth="1.8" />

        {/* Left Spindly Arm */}
        <path
          d="M60 100C45 105 35 118 30 115C25 112 28 106 36 102C45 98 55 96 60 100Z"
          fill="#D4D7E3"
          stroke="#262A3B"
          strokeWidth="2.5"
        />

        {/* Right Arm */}
        <path
          d="M148 95C165 92 178 82 182 86C185 90 178 98 165 100C155 102 148 98 148 95Z"
          fill="#D4D7E3"
          stroke="#262A3B"
          strokeWidth="2.5"
        />

        {/* Big Curious Whimsical Eyes */}
        <circle cx="85" cy="72" r="15" fill="#FAFAFA" stroke="#262A3B" strokeWidth="2.5" />
        <circle cx="86" cy="72" r="6.5" fill="#1E2130" />
        <circle cx="83" cy="69" r="2" fill="#FAFAFA" />

        <circle cx="122" cy="74" r="12" fill="#FAFAFA" stroke="#262A3B" strokeWidth="2.5" />
        <circle cx="121" cy="74" r="5.5" fill="#1E2130" />
        <circle cx="119" cy="71" r="1.8" fill="#FAFAFA" />

        {/* Stitched Smile */}
        <path
          d="M80 102C88 108 112 110 126 100"
          stroke="#262A3B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line x1="86" y1="99" x2="88" y2="106" stroke="#262A3B" strokeWidth="2" />
        <line x1="96" y1="102" x2="97" y2="108" stroke="#262A3B" strokeWidth="2" />
        <line x1="106" y1="103" x2="106" y2="109" stroke="#262A3B" strokeWidth="2" />
        <line x1="116" y1="100" x2="118" y2="106" stroke="#262A3B" strokeWidth="2" />

        {/* Top Hat */}
        <g transform="translate(15, -10) rotate(-12 100 40)">
          <ellipse cx="98" cy="45" rx="36" ry="7" fill="#1A1B26" stroke="#0E0F17" strokeWidth="2.5" />
          <path
            d="M74 43L78 12C78 10 82 8 98 8C114 8 118 10 118 12L122 43Z"
            fill="#232533"
            stroke="#0E0F17"
            strokeWidth="2.5"
          />
          <path d="M75 36L76 43H120L121 36Z" fill="#718096" />
          <circle cx="82" cy="39" r="2.5" fill="#CBD5E1" />
        </g>
      </svg>
    </div>
  );
};

// Hand-crafted Whimsical Gothic Moon Door SVG (Desaturated antique pewter & moonstone)
export const WhimsicalMoonDoorSVG: React.FC<{ className?: string; isOpen?: boolean }> = ({
  className = '',
  isOpen = false
}) => {
  return (
    <div className={`relative w-full aspect-[3/4] max-w-[260px] mx-auto transition-transform duration-700 ${isOpen ? 'scale-95' : 'hover:scale-[1.02]'} ${className}`}>
      <svg
        viewBox="0 0 240 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
      >
        {/* Outer Stone Pointed Arch Frame */}
        <path
          d="M20 310V110C20 60 70 15 120 15C170 15 220 60 220 110V310H20Z"
          fill="#121520"
          stroke="#475569"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Inner Wooden Gothic Door Panels */}
        <path
          d="M32 305V115C32 72 74 30 120 30C166 30 208 72 208 115V305H32Z"
          fill="#171A27"
          stroke="#334155"
          strokeWidth="2.5"
        />

        {/* Center Split Line */}
        <line x1="120" y1="30" x2="120" y2="305" stroke="#0F121C" strokeWidth="3" />

        {/* Muted Crescent Moon Medallion in Arch */}
        <circle cx="120" cy="95" r="30" fill="#0F121C" stroke="#64748B" strokeWidth="2.5" />
        <path
          d="M128 75C113 78 104 90 106 106C108 119 119 128 132 125C118 128 102 115 104 98C106 85 116 76 128 75Z"
          fill="#94A3B8"
        />
        <circle cx="134" cy="90" r="2" fill="#E2E8F0" />
        <circle cx="108" cy="80" r="1.5" fill="#CBD5E1" />
        <circle cx="132" cy="112" r="1.5" fill="#CBD5E1" />

        {/* Antique Iron Hinges */}
        <rect x="26" y="140" width="20" height="7" rx="1.5" fill="#475569" />
        <rect x="26" y="240" width="20" height="7" rx="1.5" fill="#475569" />
        <rect x="194" y="140" width="20" height="7" rx="1.5" fill="#475569" />
        <rect x="194" y="240" width="20" height="7" rx="1.5" fill="#475569" />

        {/* Antique Door Ring Knockers */}
        <circle cx="100" cy="180" r="9" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
        <circle cx="140" cy="180" r="9" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
        <circle cx="100" cy="172" r="2.5" fill="#94A3B8" />
        <circle cx="140" cy="172" r="2.5" fill="#94A3B8" />
      </svg>
    </div>
  );
};

// Hand-crafted Whimsical Gothic Shadow Door SVG (Desaturated antique charcoal & pewter)
export const WhimsicalShadowDoorSVG: React.FC<{ className?: string; isOpen?: boolean }> = ({
  className = '',
  isOpen = false
}) => {
  return (
    <div className={`relative w-full aspect-[3/4] max-w-[260px] mx-auto transition-transform duration-700 ${isOpen ? 'scale-95' : 'hover:scale-[1.02]'} ${className}`}>
      <svg
        viewBox="0 0 240 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
      >
        {/* Outer Stone Pointed Arch Frame */}
        <path
          d="M20 310V110C20 60 70 15 120 15C170 15 220 60 220 110V310H20Z"
          fill="#14111B"
          stroke="#52485C"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Inner Wooden Gothic Door Panels */}
        <path
          d="M32 305V115C32 72 74 30 120 30C166 30 208 72 208 115V305H32Z"
          fill="#1C1825"
          stroke="#3B3444"
          strokeWidth="2.5"
        />

        {/* Center Split Line */}
        <line x1="120" y1="30" x2="120" y2="305" stroke="#0D0B12" strokeWidth="3" />

        {/* Stylized Raven Medallion */}
        <circle cx="120" cy="95" r="30" fill="#100E17" stroke="#71627D" strokeWidth="2.5" />
        <path
          d="M120 74C114 74 110 79 110 85C110 90 114 94 118 97L116 114L120 110L124 114L122 97C126 94 130 90 130 85C130 79 126 74 120 74Z"
          fill="#8E7E9E"
        />
        <circle cx="118" cy="83" r="1.8" fill="#F1EDF5" />
        <circle cx="122" cy="83" r="1.8" fill="#F1EDF5" />

        {/* Iron Hinges */}
        <rect x="26" y="140" width="20" height="7" rx="1.5" fill="#52485C" />
        <rect x="26" y="240" width="20" height="7" rx="1.5" fill="#52485C" />
        <rect x="194" y="140" width="20" height="7" rx="1.5" fill="#52485C" />
        <rect x="194" y="240" width="20" height="7" rx="1.5" fill="#52485C" />

        {/* Handles */}
        <path d="M96 172C94 184 104 192 112 187" stroke="#8E7E9E" strokeWidth="3" strokeLinecap="round" />
        <path d="M144 172C146 184 136 192 128 187" stroke="#8E7E9E" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Elegant, antique, fine-line vector emblems for each book
export const BookIconEmblem: React.FC<{ bookId: string; className?: string }> = ({ bookId, className = '' }) => {
  switch (bookId) {
    case 'bride-diary':
      // Цыган эмэгтэйн хараал: Crystal ball, mystical all-seeing moon, antique silver filigree
      return (
        <svg viewBox="0 0 90 90" fill="none" className={`w-16 h-16 ${className}`}>
          {/* Outer Filigree Circle */}
          <circle cx="45" cy="45" r="38" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
          <circle cx="45" cy="45" r="32" fill="#141724" stroke="#94A3B8" strokeWidth="1.8" />
          
          {/* Crystal Ball & Pedestal */}
          <path d="M35 62L40 52H50L55 62H35Z" fill="#1E2336" stroke="#94A3B8" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="45" cy="42" r="16" fill="#1E273D" stroke="#CBD5E1" strokeWidth="1.5" />
          
          {/* Crescent Moon & Eye inside crystal */}
          <path
            d="M48 32C42 34 38 40 39 46C40 50 43 53 47 52C42 53 37 47 38 41C39 36 43 33 48 32Z"
            fill="#CBD5E1"
          />
          <circle cx="47" cy="41" r="2.2" fill="#F8FAFC" />
          {/* Sparkles */}
          <line x1="45" y1="21" x2="45" y2="24" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="42" x2="27" y2="42" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="63" y1="42" x2="66" y2="42" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'clock-shadows':
      // Хар сүүдрийн цаг урвуулагч: Steampunk antique clockwork & pendulum
      return (
        <svg viewBox="0 0 90 90" fill="none" className={`w-16 h-16 ${className}`}>
          <circle cx="45" cy="45" r="38" stroke="#6B5B7B" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
          <circle cx="45" cy="45" r="32" fill="#1B1624" stroke="#9B89AB" strokeWidth="1.8" />
          {/* Dial with Roman numerals hint */}
          <circle cx="45" cy="45" r="24" stroke="#524361" strokeWidth="1.2" />
          {/* Roman XIII at top */}
          <text x="37" y="30" fill="#D6CBE0" fontSize="8" fontWeight="bold" fontFamily="serif">XIII</text>
          {/* Interlocking Gears */}
          <circle cx="45" cy="45" r="12" stroke="#8E7E9E" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="45" cy="45" r="4" fill="#D6CBE0" />
          <line x1="45" y1="45" x2="45" y2="34" stroke="#E2D9EB" strokeWidth="2" strokeLinecap="round" />
          <line x1="45" y1="45" x2="54" y2="48" stroke="#8E7E9E" strokeWidth="2" strokeLinecap="round" />
          {/* Pendulum underneath */}
          <line x1="45" y1="57" x2="45" y2="67" stroke="#9B89AB" strokeWidth="1.5" />
          <circle cx="45" cy="67" r="3.5" fill="#D6CBE0" stroke="#524361" strokeWidth="1" />
        </svg>
      );
    case 'ghost-cellist':
      // Эзгүй ордны хөгжимчний нууц: Fine-line silver cello & delicate music scroll
      return (
        <svg viewBox="0 0 90 90" fill="none" className={`w-16 h-16 ${className}`}>
          <circle cx="45" cy="45" r="38" stroke="#525E75" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="45" cy="45" r="32" fill="#131826" stroke="#7E8DA6" strokeWidth="1.8" />
          {/* Elegant Cello Silhouette */}
          <path
            d="M38 28C34 34 34 39 38 43C34 47 34 54 38 61H52C56 54 56 47 52 43C56 39 56 34 52 28H38Z"
            fill="#1B2236"
            stroke="#9BAEC8"
            strokeWidth="1.8"
          />
          {/* F-holes */}
          <path d="M41 40C40 43 42 45 41 48" stroke="#7E8DA6" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M49 40C50 43 48 45 49 48" stroke="#7E8DA6" strokeWidth="1.2" strokeLinecap="round" />
          {/* Strings */}
          <line x1="43" y1="22" x2="43" y2="64" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="47" y1="22" x2="47" y2="64" stroke="#94A3B8" strokeWidth="1" />
          {/* Delicate music note */}
          <circle cx="60" cy="30" r="2.5" fill="#CBD5E1" />
          <line x1="62.5" y1="30" x2="62.5" y2="23" stroke="#CBD5E1" strokeWidth="1.2" />
        </svg>
      );
    case 'midnight-alchemist':
      // Шөнө дундын алхимич: Ancient alchemical retort / flask with crescent sigil
      return (
        <svg viewBox="0 0 90 90" fill="none" className={`w-16 h-16 ${className}`}>
          <circle cx="45" cy="45" r="38" stroke="#486053" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="45" cy="45" r="32" fill="#121D17" stroke="#6E8E7D" strokeWidth="1.8" />
          {/* Flask Body */}
          <path
            d="M40 25H50V35L61 55C63 59 60 63 55 63H35C30 63 27 59 29 55L40 35V25Z"
            fill="#182A22"
            stroke="#8FAD9D"
            strokeWidth="1.8"
          />
          {/* Liquid level */}
          <path
            d="M32 52C36 50 40 53 45 51C49 49 54 52 57 52L59 56C60 59 58 61 54 61H36C32 61 30 59 31 56L32 52Z"
            fill="#345444"
          />
          {/* Alchemical sigil on flask */}
          <circle cx="45" cy="43" r="3" stroke="#C2D6CC" strokeWidth="1.2" />
          <line x1="45" y1="38" x2="45" y2="48" stroke="#C2D6CC" strokeWidth="1.2" />
          {/* Rising faint vapor */}
          <path d="M43 21C42 18 45 16 44 13" stroke="#8FAD9D" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M47 21C48 18 46 16 47 13" stroke="#8FAD9D" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

// Playful Spooky Bats (desaturated slate)
export const WhimsicalBat: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 40 24" fill="none" className={`w-5 h-3.5 inline-block ${className}`}>
    <path
      d="M20 12C15 6 8 8 2 12C5 18 12 16 16 20C18 16 22 16 24 20C28 16 35 18 38 12C32 8 25 6 20 12Z"
      fill="#475569"
      stroke="#334155"
      strokeWidth="1.2"
    />
  </svg>
);
