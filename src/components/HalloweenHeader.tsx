import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { spookyAudio } from '../utils/audio';

interface HalloweenHeaderProps {
  currentTab: 'LIBRARY' | 'PLAZA' | 'CANDY_VAULT' | 'TROPHIES';
  onTabChange: (tab: 'LIBRARY' | 'PLAZA' | 'CANDY_VAULT' | 'TROPHIES') => void;
  candyCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

export const HalloweenHeader: React.FC<HalloweenHeaderProps> = ({
  currentTab,
  onTabChange,
  candyCount,
  soundEnabled,
  onToggleSound,
  onResetProgress
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#090B14]/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1 py-1">
          <span className="text-slate-400 shrink-0 text-[10px] sm:text-xs">✦</span>
          <span className="text-[10px] min-[360px]:text-[11px] sm:text-sm font-semibold font-gothic text-slate-200 leading-tight">
            Хатан хааны орхигдсон шилтгээн дэх адал явдал
          </span>
        </div>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => {
              spookyAudio.playPageTurn();
              onTabChange('LIBRARY');
            }}
            className={`whitespace-nowrap transition-colors relative py-1 cursor-pointer ${
              currentTab === 'LIBRARY'
                ? 'text-slate-100 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Сүнстэй номын сан
          </button>

          <button
            onClick={() => {
              spookyAudio.playPageTurn();
              onTabChange('PLAZA');
            }}
            className={`whitespace-nowrap transition-colors relative py-1 cursor-pointer ${
              currentTab === 'PLAZA'
                ? 'text-slate-100 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Хэллоуины талбай
          </button>

          <button
            onClick={() => {
              spookyAudio.playPageTurn();
              onTabChange('CANDY_VAULT');
            }}
            className={`whitespace-nowrap transition-colors relative py-1 cursor-pointer ${
              currentTab === 'CANDY_VAULT'
                ? 'text-slate-100 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Чихрийн сан
          </button>

          <button
            onClick={() => {
              spookyAudio.playPageTurn();
              onTabChange('TROPHIES');
            }}
            className={`whitespace-nowrap transition-colors relative py-1 cursor-pointer ${
              currentTab === 'TROPHIES'
                ? 'text-slate-100 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Амжилтын танхим
          </button>
        </nav>

        {/* Zone 3: 1 primary action area with Candy Counter and Utility triggers */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Candy Counter (Elegant Muted Amber) */}
          <div 
            onClick={() => onTabChange('CANDY_VAULT')}
            role="button"
            tabIndex={0}
            className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 transition-all cursor-pointer group"
            title="Чихрийн сан руу очих"
          >
            <span className="text-sm sm:text-base group-hover:scale-110 transition-transform">🍬</span>
            <span className="text-xs text-slate-400 hidden sm:inline">Чихэр:</span>
            <span className="font-mono tabular-nums text-xs sm:text-sm font-bold text-amber-300/95 group-hover:text-amber-200">
              {candyCount}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Дуу хаах' : 'Дуу нээх'}
            title={soundEnabled ? 'Дуу хаах' : 'Дуу нээх'}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-800/60 cursor-pointer"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Reset progress */}
          <button
            onClick={() => {
              if (window.confirm('Бүх тоглоомын явц болон чихрийн цуглуулгыг шинэчлэх үү?')) {
                onResetProgress();
              }
            }}
            aria-label="Тоглоомыг шинэчлэх"
            title="Тоглоомын явцыг шинэчлэх"
            className="p-1.5 sm:p-2 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-800/60 cursor-pointer"
          >
            <RotateCcw size={15} />
          </button>
        </div>

      </div>

      {/* Mobile nav bar row */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/80 bg-[#0A0C16] text-xs">
        <button
          onClick={() => onTabChange('LIBRARY')}
          className={`px-2 py-1 ${currentTab === 'LIBRARY' ? 'text-slate-200 font-semibold' : 'text-slate-400'}`}
        >
          Номын сан
        </button>
        <button
          onClick={() => onTabChange('PLAZA')}
          className={`px-2 py-1 ${currentTab === 'PLAZA' ? 'text-slate-200 font-semibold' : 'text-slate-400'}`}
        >
          Талбай
        </button>
        <button
          onClick={() => onTabChange('CANDY_VAULT')}
          className={`px-2 py-1 ${currentTab === 'CANDY_VAULT' ? 'text-slate-200 font-semibold' : 'text-slate-400'}`}
        >
          Чихэр
        </button>
        <button
          onClick={() => onTabChange('TROPHIES')}
          className={`px-2 py-1 ${currentTab === 'TROPHIES' ? 'text-slate-200 font-semibold' : 'text-slate-400'}`}
        >
          Амжилт
        </button>
      </div>
    </header>
  );
};
