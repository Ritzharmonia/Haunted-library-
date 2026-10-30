import React from 'react';
import { Book } from '../types/game';
import { ArrowLeft, ArrowRight, Sparkles, X } from 'lucide-react';
import { BookIconEmblem } from './WhimsicalAssets';
import { GothicCandle } from './GothicCandle';
import { spookyAudio } from '../utils/audio';

interface BookReaderProps {
  book: Book;
  currentPageIndex: number; // 0: prologue, 1: page 1, 2: page 2, 3: page 3
  onPageChange: (newIndex: number) => void;
  onUnravelSecret: () => void;
  onClose: () => void;
}

export const BookReader: React.FC<BookReaderProps> = ({
  book,
  currentPageIndex,
  onPageChange,
  onUnravelSecret,
  onClose
}) => {
  const pageTitles = ['Оршил', '1-р нүүр', '2-р нүүр', '3-р нүүр'];

  const handleNext = () => {
    if (currentPageIndex < 3) {
      spookyAudio.playPageTurn();
      onPageChange(currentPageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      spookyAudio.playPageTurn();
      onPageChange(currentPageIndex - 1);
    }
  };

  const handleJump = (idx: number) => {
    spookyAudio.playPageTurn();
    onPageChange(idx);
  };

  const isPrologue = currentPageIndex === 0;
  const pageData = isPrologue ? null : book.pages[currentPageIndex - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      {/* Whimsical open antique grimoire container */}
      <div className="relative w-full max-w-3xl bg-[#0F111D] border-2 border-slate-700/70 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden my-auto">
        
        {/* Subtle antique ribbon bookmark hanging from top */}
        <div className="absolute top-0 right-14 w-6 h-10 bg-slate-600 rounded-b-md shadow-md z-20 flex items-end justify-center pb-1">
          <div className="w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-[#0F111D]" />
        </div>

        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0A0C16]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
              <BookIconEmblem bookId={book.id} className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold font-gothic text-slate-100 tracking-wide">
                {book.title}
              </h2>
              <p className="text-xs text-slate-400">
                {book.genre}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <GothicCandle size="sm" />
            </div>
            <button
              onClick={() => {
                spookyAudio.playPageTurn();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Хаах"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Page Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#080912] border-b border-slate-800/80 text-xs">
          {pageTitles.map((title, idx) => (
            <button
              key={idx}
              onClick={() => handleJump(idx)}
              className={`px-3.5 py-1.5 rounded-lg transition-all font-medium cursor-pointer ${
                currentPageIndex === idx
                  ? 'bg-slate-700 text-slate-100 font-bold border border-slate-500/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        {/* Story Reading Content */}
        <div className="p-6 sm:p-10 min-h-[400px] flex flex-col justify-between bg-[#111322]/90">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            
            {/* Chapter Header */}
            <div className="text-center pb-3 border-b border-slate-800/80">
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold">
                {isPrologue ? '✦ УДИРТГАЛ ХЭСЭГ ✦' : `✦ ${pageData?.chapterNumber.toUpperCase()} ✦`}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-gothic text-slate-100 mt-1">
                {isPrologue ? 'Зохиолын Оршил' : pageData?.title}
              </h3>
            </div>

            {/* Natural, atmospheric literary Mongolian prose */}
            <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              {isPrologue ? (
                <div className="p-5 rounded-2xl bg-[#0B0D18] border border-slate-800 space-y-4 shadow-inner">
                  <p className="first-letter:text-4xl first-letter:font-gothic first-letter:text-slate-300 first-letter:float-left first-letter:mr-3 first-letter:font-extrabold italic text-slate-200 leading-relaxed">
                    {book.prologue}
                  </p>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-amber-300/90 font-bold">Боломжит шагнал: 🍬 +{book.candiesReward + book.bonusCandies} чихэр</span>
                    <span className="text-slate-300 font-medium">{book.trophyIcon} {book.trophyTitle}</span>
                  </div>
                </div>
              ) : (
                pageData?.content.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className={
                      pIdx === 0
                        ? "first-letter:text-4xl first-letter:font-gothic first-letter:text-slate-300 first-letter:float-left first-letter:mr-3 first-letter:font-extrabold text-slate-100"
                        : "text-slate-200"
                    }
                  >
                    {paragraph}
                  </p>
                ))
              )}

              {/* Clue Note */}
              {!isPrologue && pageData?.clue && (
                <div className="mt-5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2.5">
                  <Sparkles size={16} className="text-slate-400 shrink-0" />
                  <span>
                    <strong className="text-slate-200 font-semibold">Нууц сэжүүр:</strong> {pageData.clue}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Navigation */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                currentPageIndex === 0
                  ? 'opacity-30 text-slate-600 cursor-not-allowed'
                  : 'text-slate-300 bg-slate-800 hover:bg-slate-700 cursor-pointer'
              }`}
            >
              <ArrowLeft size={14} />
              <span>Өмнөх нүүр</span>
            </button>

            <span className="text-xs text-slate-400 font-mono">
              Нүүр {currentPageIndex + 1} / 4
            </span>

            {currentPageIndex < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-600/60 transition-all cursor-pointer"
              >
                <span>Дараагийн нүүр</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => {
                  spookyAudio.playChime();
                  onUnravelSecret();
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 hover:from-white hover:to-slate-200 transition-all shadow-md cursor-pointer font-gothic tracking-wider"
              >
                <Sparkles size={15} />
                <span>НУУЦЫГ ТАЙЛАХ</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
