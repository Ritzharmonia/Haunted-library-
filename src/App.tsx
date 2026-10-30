import React, { useState, useEffect } from 'react';
import { SavedUserProgress } from './types/game';
import { loadUserProgress, saveUserProgress, INITIAL_PROGRESS } from './utils/storage';
import { spookyAudio } from './utils/audio';
import { HalloweenHeader } from './components/HalloweenHeader';
import { HauntedLibrary } from './components/HauntedLibrary';
import { HalloweenPlaza } from './components/HalloweenPlaza';
import { CandyVault } from './components/CandyVault';
import { TrophyHall } from './components/TrophyHall';

export default function App() {
  const [userProgress, setUserProgress] = useState<SavedUserProgress>(() => loadUserProgress());
  const [currentTab, setCurrentTab] = useState<'LIBRARY' | 'PLAZA' | 'CANDY_VAULT' | 'TROPHIES'>('LIBRARY');

  // Sync audio toggle with audio controller
  useEffect(() => {
    spookyAudio.enabled = userProgress.soundEnabled;
  }, [userProgress.soundEnabled]);

  // Persist state updates
  const handleUpdateProgress = (updated: SavedUserProgress) => {
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleToggleSound = () => {
    const nextVal = !userProgress.soundEnabled;
    spookyAudio.enabled = nextVal;
    if (nextVal) {
      spookyAudio.playChime();
    }
    const updated: SavedUserProgress = {
      ...userProgress,
      soundEnabled: nextVal
    };
    handleUpdateProgress(updated);
  };

  const handleResetProgress = () => {
    localStorage.removeItem('halloween_purchased_relics');
    handleUpdateProgress(INITIAL_PROGRESS);
    spookyAudio.playPageTurn();
    setCurrentTab('LIBRARY');
  };

  const handleBrewCandies = (amount: number) => {
    const updated: SavedUserProgress = {
      ...userProgress,
      candyCount: userProgress.candyCount + amount,
      historyLog: [
        {
          timestamp: Date.now(),
          bookTitle: 'Хэллоуины талбай',
          action: `Шулмын тогооноос +${amount} чихрийн ундарга амталлаа!`,
          rewardGranted: amount
        },
        ...userProgress.historyLog
      ]
    };
    handleUpdateProgress(updated);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-[#e2e4f0] font-sans flex flex-col justify-between selection:bg-cyan-900/60 selection:text-cyan-200">
      
      {/* Top Gothic Header */}
      <HalloweenHeader
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        candyCount={userProgress.candyCount}
        soundEnabled={userProgress.soundEnabled}
        onToggleSound={handleToggleSound}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'LIBRARY' && (
          <HauntedLibrary
            userProgress={userProgress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentTab === 'PLAZA' && (
          <HalloweenPlaza
            onEnterLibrary={() => setCurrentTab('LIBRARY')}
            onBrewCandies={handleBrewCandies}
            candyCount={userProgress.candyCount}
          />
        )}

        {currentTab === 'CANDY_VAULT' && (
          <CandyVault
            userProgress={userProgress}
            onUpdateProgress={handleUpdateProgress}
            onGoToLibrary={() => setCurrentTab('LIBRARY')}
          />
        )}

        {currentTab === 'TROPHIES' && (
          <TrophyHall
            userProgress={userProgress}
            onGoToBook={() => setCurrentTab('LIBRARY')}
          />
        )}
      </main>

      {/* Quiet Gothic Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060710] py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-gothic tracking-wider">
            ✦ СҮНСТЭЙ НОМЫН САН · ЛИБЕРТИА ХАТАН ХААНЫ 3-Р ОН ✦
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setCurrentTab('LIBRARY')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Номын сан
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentTab('PLAZA')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Талбай
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentTab('CANDY_VAULT')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Чихрийн сан
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
