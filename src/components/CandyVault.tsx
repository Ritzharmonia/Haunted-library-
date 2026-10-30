import React, { useState } from 'react';
import { SavedUserProgress } from '../types/game';
import { HAUNTED_BOOKS } from '../data/books';
import { ShoppingBag, Sparkles, Check, History, ArrowRight } from 'lucide-react';
import { spookyAudio } from '../utils/audio';

interface CandyVaultProps {
  userProgress: SavedUserProgress;
  onUpdateProgress: (updated: SavedUserProgress) => void;
  onGoToLibrary: () => void;
}

interface RelicItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
}

const HALLOWEEN_RELICS: RelicItem[] = [
  {
    id: 'relic_blue_candle',
    name: 'Мөнхийн хөх дөлт лаа',
    price: 40,
    icon: '🕯️',
    description: 'Corpse Bride-ийн бунханд хэзээ ч унтрахгүй асах шидэт лаа.'
  },
  {
    id: 'relic_ghost_hat',
    name: 'Тим Бертоны сүнстэй бүрх малгай',
    price: 70,
    icon: '🎩',
    description: 'Шөнийн цагаар өөрөө хөвдөг Викторийн язгууртан сүнсний малгай.'
  },
  {
    id: 'relic_potion_vial',
    name: 'Алхимичийн сүүдэрт шил',
    price: 50,
    icon: '🧪',
    description: 'Маргад ногоон утаа савссан нууц хольц.'
  },
  {
    id: 'relic_silver_amulet',
    name: 'Мөнгөн сарны сахиус',
    price: 90,
    icon: '🌙',
    description: 'Сүнсний гэнэтийн хараалаас хамгаалах эртний зүүлт.'
  }
];

export const CandyVault: React.FC<CandyVaultProps> = ({
  userProgress,
  onUpdateProgress,
  onGoToLibrary
}) => {
  const [purchasedRelics, setPurchasedRelics] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('halloween_purchased_relics');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleBuyRelic = (relic: RelicItem) => {
    if (userProgress.candyCount < relic.price) {
      alert(`Уучлаарай, танд ${relic.price - userProgress.candyCount} чихэр дутаж байна! Сүнстэй номын сангаас ном уншиж чихэр цуглуулна уу.`);
      return;
    }

    spookyAudio.playVictory();
    const newCount = userProgress.candyCount - relic.price;
    const newPurchased = [...purchasedRelics, relic.id];
    setPurchasedRelics(newPurchased);
    localStorage.setItem('halloween_purchased_relics', JSON.stringify(newPurchased));

    const updated: SavedUserProgress = {
      ...userProgress,
      candyCount: newCount,
      historyLog: [
        {
          timestamp: Date.now(),
          bookTitle: 'Чихрийн сан',
          action: `"${relic.name}" дурсгалыг ${relic.price} чихрээр худалдан авлаа.`,
          rewardGranted: -relic.price
        },
        ...userProgress.historyLog
      ]
    };
    onUpdateProgress(updated);
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* Candy Stats Overview */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-950/80 bg-[#090b17] p-6 sm:p-10 shadow-[0_0_50px_rgba(7,9,20,0.9)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              ✦ ХЭЛЛОУИНЫ ЧИХРИЙН АВДАР ✦
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-gothic text-slate-100">
              ЧИХРИЙН НӨӨЦ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Сүнстэй номын сангийн оньсогуудыг тайлж авсан бүх чихэр энд бүртгэгдэнэ. 
              Нэг авсан шагнал давхар олгогдохгүй, баталгаатай хадгалагдана.
            </p>
          </div>

          <div className="bg-[#12152b] p-6 rounded-2xl border border-indigo-900/60 text-center min-w-[200px] shadow-inner">
            <span className="text-3xl sm:text-4xl block mb-1">🍬</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
              Нийт чихэр
            </span>
            <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-300">
              {userProgress.candyCount}
            </span>
          </div>
        </div>
      </div>

      {/* Book Candy Earnings Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-gothic text-slate-100 flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-400" />
          <span>Ном тус бүрийн чихрийн шагналын төлөв</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HAUNTED_BOOKS.map((book) => {
            const isClaimed = Boolean(userProgress.claimedBookRewards[book.id]);
            return (
              <div
                key={book.id}
                className={`p-4 rounded-xl border transition-all ${
                  isClaimed
                    ? 'bg-emerald-950/20 border-emerald-500/50'
                    : 'bg-[#0c0e20] border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400 truncate max-w-[140px]">
                    {book.genre}
                  </span>
                  {isClaimed ? (
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                      АВСАН ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      АВААГҮЙ
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold font-gothic text-slate-100 line-clamp-1">
                  {book.title}
                </h4>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Шагнал:</span>
                  <span className="font-mono font-bold text-amber-300">
                    🍬 +{book.candiesReward + book.bonusCandies}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Halloween Relics Shop */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-gothic text-slate-100 flex items-center gap-2">
            <ShoppingBag size={18} className="text-cyan-400" />
            <span>Готик дурсгалын дэлгүүр (Чихрээр худалдан авах)</span>
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Цуглуулсан чихрээрээ сонирхолтой дурсгал аваарай
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HALLOWEEN_RELICS.map((relic) => {
            const isOwned = purchasedRelics.includes(relic.id);
            const canAfford = userProgress.candyCount >= relic.price;

            return (
              <div
                key={relic.id}
                className="p-5 rounded-2xl bg-[#0c0e20] border border-indigo-950/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl mb-3 shadow">
                    {relic.icon}
                  </div>
                  <h4 className="text-sm font-bold font-gothic text-slate-100">
                    {relic.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {relic.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-950 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-300">
                    🍬 {relic.price} чихэр
                  </span>

                  {isOwned ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/40">
                      <Check size={12} /> АВСАН
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBuyRelic(relic)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        canAfford
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(56,189,248,0.3)] cursor-pointer'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Авах
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Log */}
      <div className="space-y-3">
        <h3 className="text-base font-bold font-gothic text-slate-100 flex items-center gap-2">
          <History size={16} className="text-slate-400" />
          <span>Шагнал, үйлдлийн түүх</span>
        </h3>

        <div className="bg-[#0b0d1e] rounded-xl border border-indigo-950/60 p-4 divide-y divide-indigo-950/60 text-xs">
          {userProgress.historyLog.slice(0, 8).map((entry, idx) => (
            <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200 block">{entry.bookTitle}</span>
                <span className="text-slate-400">{entry.action}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500 shrink-0">
                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
