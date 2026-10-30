import React from 'react';
import { SavedUserProgress } from '../types/game';
import { HAUNTED_BOOKS } from '../data/books';
import { Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { spookyAudio } from '../utils/audio';

interface TrophyHallProps {
  userProgress: SavedUserProgress;
  onGoToBook: (bookId: string) => void;
}

export const TrophyHall: React.FC<TrophyHallProps> = ({
  userProgress,
  onGoToBook
}) => {
  return (
    <div className="space-y-10 pb-12">
      
      {/* Trophy Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0B0D17] p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold">
              ✦ ГОТИК АМЖИЛТЫН ЦОМУУД ✦
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-gothic text-slate-100">
              СҮНСТЭЙ ЦОМЫН ТАНХИМ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Номын сангийн 4 номын нууц оньсогыг тайлж, Сарны тамга ба Хар сүүдрийн аюулгүй хаалгыг сонгон нээснээр олгогддог онцгой дурсгалууд.
            </p>
          </div>

          <div className="bg-[#121422] p-5 rounded-2xl border border-slate-800 text-center min-w-[180px]">
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
              Нээсэн цом
            </span>
            <span className="text-3xl font-mono font-extrabold text-amber-300/90">
              {userProgress.unlockedTrophies.length} / {HAUNTED_BOOKS.length}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Trophies Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HAUNTED_BOOKS.map((book) => {
          const isUnlocked = userProgress.unlockedTrophies.includes(book.trophyId);

          return (
            <div
              key={book.trophyId}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-[#121524] border-slate-600 shadow-xl'
                  : 'bg-[#0E101D] border-slate-800 opacity-65'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border shadow-inner ${
                    isUnlocked
                      ? 'bg-slate-800 border-slate-600'
                      : 'bg-slate-900 border-slate-800 grayscale'
                  }`}>
                    {book.trophyIcon}
                  </div>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-300 bg-slate-800 border border-slate-700">
                      <CheckCircle size={14} /> НЭЭГДСЭН
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800">
                      <Lock size={14} /> ТҮГЖЭЭТЭЙ
                    </span>
                  )}
                </div>

                <span className="text-xs font-mono text-slate-400 block">
                  Хамаарах ном: {book.title}
                </span>

                <h3 className="text-xl font-bold font-gothic text-slate-100 mt-1">
                  {book.trophyTitle}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {book.trophyDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Шагнал: 🍬 +{book.candiesReward + book.bonusCandies} чихэр
                </span>

                <button
                  onClick={() => {
                    spookyAudio.playPageTurn();
                    onGoToBook(book.id);
                  }}
                  className="text-slate-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>{isUnlocked ? 'Номыг дахин унших' : 'Номыг нээж тоглох'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
