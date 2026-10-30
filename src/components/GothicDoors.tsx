import React, { useState } from 'react';
import { Book } from '../types/game';
import { WhimsicalMoonDoorSVG, WhimsicalShadowDoorSVG, WhimsicalGhost } from './WhimsicalAssets';
import { Award, Sparkles, AlertOctagon, RotateCcw, ArrowLeft } from 'lucide-react';
import { spookyAudio } from '../utils/audio';

interface GothicDoorsProps {
  book: Book;
  isRewardAlreadyClaimed: boolean;
  onClaimReward: (candies: number, trophyId: string) => void;
  onReturnToLibrary: () => void;
  onRereadBook: () => void;
}

export const GothicDoors: React.FC<GothicDoorsProps> = ({
  book,
  isRewardAlreadyClaimed,
  onClaimReward,
  onReturnToLibrary,
  onRereadBook
}) => {
  const [chosenDoor, setChosenDoor] = useState<'MOON' | 'SHADOW' | null>(null);
  const [doorOpened, setDoorOpened] = useState(false);
  const [openingAnimation, setOpeningAnimation] = useState(false);

  const handleSelectDoor = (door: 'MOON' | 'SHADOW') => {
    if (openingAnimation || doorOpened) return;

    setChosenDoor(door);
    setOpeningAnimation(true);
    spookyAudio.playDoorCreak();

    setTimeout(() => {
      setOpeningAnimation(false);
      setDoorOpened(true);

      const isSafe = door === book.safeDoor;
      if (isSafe) {
        spookyAudio.playVictory();
        if (!isRewardAlreadyClaimed) {
          onClaimReward(book.candiesReward + book.bonusCandies, book.trophyId);
        }
      } else {
        spookyAudio.playGhostCurse();
      }
    }, 1200);
  };

  const isSafeOutcome = chosenDoor === book.safeDoor;

  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-[#0C0E18] p-6 sm:p-10 shadow-2xl flex flex-col justify-between min-h-[620px]">
      
      {/* Top Header */}
      <div className="relative z-10 text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold">
          ✦ ЭЦСИЙН ШАТ: ХОЁР ГОТИК ХААЛГА ✦
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-gothic text-slate-100 tracking-wider">
          ТА АЛЬ ХААЛГЫГ ТҮЛХЭХ ВЭ?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Зохиолд дурдагдсан далд сэжүүрийг санаарай: Нэг нь чихрийн сангийн аюулгүй хаалга, нөгөө нь сүнсний урхи юм!
        </p>
      </div>

      {/* Main Choice or Reveal */}
      <div className="my-8 flex items-center justify-center">
        {!doorOpened ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
            
            {/* Left Door: САРНЫ ТАМГА (Antique Pewter / Moonstone) */}
            <div
              onClick={() => handleSelectDoor('MOON')}
              className={`group p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center ${
                chosenDoor === 'MOON' && openingAnimation
                  ? 'border-slate-400 bg-slate-900/80 shadow-lg scale-102 animate-pulse'
                  : 'border-slate-700/80 bg-[#121624] hover:border-slate-500 hover:shadow-xl hover:-translate-y-1.5'
              }`}
            >
              <WhimsicalMoonDoorSVG isOpen={openingAnimation && chosenDoor === 'MOON'} />
              
              <div className="mt-4 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                  Зүүн хаалга
                </span>
                <h3 className="text-xl font-bold font-gothic text-slate-100 group-hover:text-slate-200">
                  САРНЫ ТАМГА
                </h3>
                <p className="text-xs text-slate-400">
                  Мөнгөн сарны хүйтэн туяа сийлэгдсэн готик хаалга.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 w-full text-xs font-bold text-slate-300">
                {openingAnimation && chosenDoor === 'MOON' ? 'Хаалга онгойж байна...' : 'Энэ хаалгыг түлхэх ⟶'}
              </div>
            </div>

            {/* Right Door: ХАР СҮҮДЭР (Antique Charcoal / Dark Pewter) */}
            <div
              onClick={() => handleSelectDoor('SHADOW')}
              className={`group p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center ${
                chosenDoor === 'SHADOW' && openingAnimation
                  ? 'border-slate-400 bg-slate-900/80 shadow-lg scale-102 animate-pulse'
                  : 'border-slate-700/80 bg-[#171322] hover:border-slate-500 hover:shadow-xl hover:-translate-y-1.5'
              }`}
            >
              <WhimsicalShadowDoorSVG isOpen={openingAnimation && chosenDoor === 'SHADOW'} />
              
              <div className="mt-4 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                  Баруун хаалга
                </span>
                <h3 className="text-xl font-bold font-gothic text-slate-100 group-hover:text-slate-200">
                  ХАР СҮҮДЭР
                </h3>
                <p className="text-xs text-slate-400">
                  Хэрээний өд, гүн сүүдрээр урласан харанхуй хаалга.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 w-full text-xs font-bold text-slate-300">
                {openingAnimation && chosenDoor === 'SHADOW' ? 'Хаалга онгойж байна...' : 'Энэ хаалгыг түлхэх ⟶'}
              </div>
            </div>

          </div>
        ) : (
          /* Outcome Stage: Safe vs Trap */
          <div className="w-full max-w-lg bg-[#111322] border-2 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            {isSafeOutcome ? (
              /* Safe Door */
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-800/80 border-2 border-slate-600 flex items-center justify-center text-4xl shadow-inner animate-bounce">
                  🏆
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-slate-400 tracking-wider uppercase font-bold">
                    ✦ ТА АЮУЛГҮЙ ХААЛГЫГ СОНГОЛОО! ✦
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-gothic text-slate-100">
                    БАЯР ХҮРГЭЕ, ТА ЯЛАГЧ!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Та {chosenDoor === 'MOON' ? 'САРНЫ ТАМГА' : 'ХАР СҮҮДЭР'} хаалгыг зөв тааж, шилтгээний эрдэнэст хүрлээ!
                  </p>
                </div>

                {/* Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 text-left text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span>🍬</span> Үндсэн чихрийн шагнал:
                    </span>
                    <span className="font-mono font-bold text-amber-300/90">+{book.candiesReward} чихэр</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Sparkles size={15} className="text-slate-400" /> Ухаалаг сонголтын бонус:
                    </span>
                    <span className="font-mono font-bold text-slate-200">+{book.bonusCandies} чихэр</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Award size={15} className="text-amber-400" /> Нээсэн цом:
                    </span>
                    <span className="font-bold text-amber-300/90">{book.trophyIcon} {book.trophyTitle}</span>
                  </div>
                </div>

                {isRewardAlreadyClaimed ? (
                  <p className="text-xs text-amber-300/90 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    ⚠️ Энэ номын шагналыг урьд нь авсан тул таны цуглуулгад бүртгэлтэй байна.
                  </p>
                ) : (
                  <p className="text-xs text-emerald-300/90 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    ✓ Шагнал үндсэн чихрийн тоолуурт амжилттай нэмэгдэн хадгалагдлаа!
                  </p>
                )}

                <button
                  onClick={onReturnToLibrary}
                  className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-white hover:to-slate-200 shadow-md font-gothic tracking-wider cursor-pointer"
                >
                  НОМЫН САН РУУ БУЦАХ
                </button>
              </div>
            ) : (
              /* Trap Door: Whimsical Tim Burton Ghost */
              <div className="space-y-5">
                <div className="flex justify-center">
                  <WhimsicalGhost size={160} />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-bold flex items-center justify-center gap-1">
                    <AlertOctagon size={14} /> УРХИНД ОРЛОО!
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-gothic text-slate-100">
                    {book.trapCurse.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {book.trapCurse.description}
                  </p>
                </div>

                {/* Fake Whimsical Curse */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                    👻 ХӨГЖИЛТЭЙ СҮНСНИЙ ХАРААЛ:
                  </span>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{book.trapCurse.effect}"
                  </p>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Шагнал олгогдсонгүй (Шагналгүй төгсгөл).
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={onRereadBook}
                    className="flex-1 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>Зохиол харах</span>
                  </button>

                  <button
                    onClick={() => {
                      setDoorOpened(false);
                      setChosenDoor(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-white flex items-center justify-center gap-1.5 font-gothic cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Дахин сонгох</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom info */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
        <button
          onClick={onReturnToLibrary}
          className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Номын сан руу буцах</span>
        </button>

        <span className="font-mono text-slate-500">
          Сонгосон ном: {book.title}
        </span>
      </div>

    </div>
  );
};
