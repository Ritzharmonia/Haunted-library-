import React, { useState } from 'react';
import { Flame, BookOpen, ChevronRight, ShoppingBag } from 'lucide-react';
import { GothicCandle } from './GothicCandle';
import { WhimsicalGhost, WhimsicalBat } from './WhimsicalAssets';
import { spookyAudio } from '../utils/audio';

interface HalloweenPlazaProps {
  onEnterLibrary: () => void;
  onBrewCandies: (amount: number) => void;
  candyCount: number;
}

export const HalloweenPlaza: React.FC<HalloweenPlazaProps> = ({
  onEnterLibrary,
  onBrewCandies,
  candyCount
}) => {
  const [hasBrewed, setHasBrewed] = useState(false);
  const [isBrewing, setIsBrewing] = useState(false);

  const handleBrewPotion = () => {
    if (hasBrewed || isBrewing) return;
    setIsBrewing(true);
    spookyAudio.playChime();

    setTimeout(() => {
      setIsBrewing(false);
      setHasBrewed(true);
      spookyAudio.playVictory();
      onBrewCandies(25);
    }, 1200);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Modern Whimsical Hero Section (Desaturated & Elegant) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0B0D17] shadow-2xl p-6 sm:p-12 lg:p-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="space-y-5 max-w-2xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <WhimsicalBat className="text-slate-500" />
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold">
                ЛИБЕРТИА ХАТАН ХААНЫ 3-Р ОН
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-gothic text-slate-100 tracking-normal sm:tracking-wide leading-tight">
              ХАТАН ХААНЫ ОРХИГДСОН <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-400">
                ШИЛТГЭЭН ДЭХ АДАЛ ЯВДАЛ
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Хуучин гар бичмэлүүд агаарт өөрөө хөвөх энэхүү шидэт ордны гүнд зочлоорой.
              Зохиол бүрийн далд оньсогыг тайлж, Сарны тамга ба Хар сүүдрийн хаалгыг зөв таан 
              их хэмжээний чихэр, ховор цомуудыг цуглуулаарай!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  spookyAudio.playPageTurn();
                  onEnterLibrary();
                }}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-gothic text-sm font-bold text-slate-950 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 hover:from-white hover:to-slate-200 transition-all shadow-md cursor-pointer group"
              >
                <BookOpen size={18} />
                <span>СҮНСТЭЙ НОМЫН САН РУУ ОРОХ</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Vector Artwork with Whimsical Ghost & Candle */}
          <div className="flex flex-col items-center gap-4 bg-[#121422] p-8 rounded-3xl border border-slate-800 shadow-inner">
            <WhimsicalGhost size={160} />
            <GothicCandle size="sm" />
          </div>

        </div>
      </div>

      {/* Mansion Zones Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-gothic text-slate-100">
          Шилтгээний онцлох хэсгүүд
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Section 1: Сүнстэй номын сан (Featured Adventure) */}
          <div
            onClick={() => {
              spookyAudio.playPageTurn();
              onEnterLibrary();
            }}
            className="p-6 rounded-3xl bg-[#101322] border-2 border-slate-700/80 hover:border-slate-500 shadow-lg transition-all hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 mb-4">
                <BookOpen size={24} />
              </div>
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                ГОЛ АДАЛ ЯВДАЛ
              </span>
              <h3 className="text-lg font-bold font-gothic text-slate-100 mt-1">
                Сүнстэй номын сан
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                4 өөр готик зохиол, 3 нүүрт гар бичмэл, 6 үе шаттай асуулт ба 2 нууц хаалганы сорилт.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Одоо тоглох</span>
              <span>⟶</span>
            </div>
          </div>

          {/* Section 2: Шулмын хөх тогоо (Candy Mini-Game) */}
          <div className="p-6 rounded-3xl bg-[#141220] border border-slate-700/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 mb-4">
                <Flame size={24} />
              </div>
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                ЧИХРИЙН УНДАРГА
              </span>
              <h3 className="text-lg font-bold font-gothic text-slate-100 mt-1">
                Шулмын шидэт тогоо
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Хөх лааны дөлөөр шидэт хольц чанаж, үдшийн бэлэг болгон +25 чихэр хүртээрэй.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={handleBrewPotion}
                disabled={hasBrewed || isBrewing}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                  hasBrewed
                    ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-100 shadow-md cursor-pointer'
                }`}
              >
                {isBrewing ? 'Буцалгаж байна...' : hasBrewed ? '✓ 25 чихэр авсан' : '🍬 +25 Чихэр чанах'}
              </button>
            </div>
          </div>

          {/* Section 3: Чихрийн нөөц */}
          <div className="p-6 rounded-3xl bg-[#101422] border border-slate-700/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 mb-4">
                <ShoppingBag size={24} />
              </div>
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                ДАНСНЫ БАЙДАЛ
              </span>
              <h3 className="text-lg font-bold font-gothic text-slate-100 mt-1">
                Чихрийн сан ба Дэлгүүр
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Таны цуглуулсан бүх чихэр хадгалагдаж, готик дурсгалын зүйлс худалдан авах боломжтой.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span>Чихрийн үлдэгдэл:</span>
              <span className="text-amber-300/90 font-bold text-sm">🍬 {candyCount}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
