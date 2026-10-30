import React from 'react';
import { Book, SavedUserProgress } from '../types/game';
import { GothicCandle } from './GothicCandle';
import { BookIconEmblem, WhimsicalBat } from './WhimsicalAssets';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { spookyAudio } from '../utils/audio';

interface BookShelfProps {
  books: Book[];
  userProgress: SavedUserProgress;
  onSelectBook: (book: Book) => void;
}

export const BookShelf: React.FC<BookShelfProps> = ({
  books,
  userProgress,
  onSelectBook
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-[#0B0D17] shadow-2xl p-6 sm:p-10 lg:p-12 space-y-10">
      
      {/* Decorative Victorian Top Arch Header */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
        
        {/* Title & Introduction */}
        <div className="space-y-3 text-center md:text-left max-w-xl">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <WhimsicalBat className="text-slate-500" />
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold">
              ЛИБЕРТИА ХАТАН ХААНЫ 3-Р ОН
            </span>
            <WhimsicalBat className="text-slate-500 transform -scale-x-100" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-gothic text-slate-100 tracking-wide">
            СҮНСТЭЙ НОМЫН САН
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Хуучин шилтгээний өндөр тавиур дээр нойрсож буй шидэт 4 зохиолоос сонгон нээгээрэй. 
            Зохиолын нүүр бүрийг анхааралтай уншиж, далд сэжүүрийг тайлснаар 
            <strong className="text-slate-200"> "Сарны тамга"</strong> болон <strong className="text-slate-300">"Хар сүүдэр"</strong>-ийн эцсийн хаалганы түлхүүрийг авах болно!
          </p>
        </div>

        {/* Right Candelabra Display */}
        <div className="flex items-end gap-5 bg-[#121422] p-4 rounded-2xl border border-slate-800 shadow-inner">
          <GothicCandle size="sm" />
          <GothicCandle size="md" />
          <GothicCandle size="sm" />
        </div>
      </div>

      {/* Floating Library Wisdom strip (unsaturate & elegant) */}
      <div className="flex justify-around items-center py-2.5 text-xs text-slate-400 border border-slate-800/60 bg-[#0E101D] rounded-2xl px-4">
        <div className="flex items-center gap-2 animate-float-slow">
          <span className="text-slate-400">✦</span>
          <span className="italic font-serif">"Сарны мөнгөн туяа худал хуурмагийг үл тэвчинэ..."</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 animate-float-reverse">
          <span className="text-slate-400">✦</span>
          <span className="italic font-serif">"13 дахь цагийн заагт бодит үнэн нуугдана..."</span>
        </div>
        <div className="hidden md:flex items-center gap-2 animate-float-slow">
          <span className="text-slate-400">✦</span>
          <span className="italic font-serif">"Хар сүүдэр мөнхийн эрдэнэсийг хадгална..."</span>
        </div>
      </div>

      {/* The 4 Elegant Ornate Book Covers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 tracking-wider uppercase flex items-center gap-2">
            <span>⚜️</span>
            <span>ЭРТНИЙ ГАР БИЧМЭЛҮҮД ({books.length})</span>
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Номыг товшиж уншина уу
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, idx) => {
            const isClaimed = Boolean(userProgress.claimedBookRewards[book.id]);
            const currentSavedPage = userProgress.currentBookPage[book.id] ?? 0;
            const hasStarted = currentSavedPage > 0;

            // Sophisticated, desaturated leather and pewter palette per book
            const cardPalette =
              book.id === 'bride-diary'
                ? {
                    bg: 'from-[#131726] via-[#101421] to-[#0D101A]',
                    border: 'border-slate-700/60 group-hover:border-slate-500/90',
                    innerFrame: 'border-slate-700/50',
                    foil: 'text-slate-300',
                    shadow: 'group-hover:shadow-[0_12px_28px_rgba(30,41,59,0.35)]',
                  }
                : book.id === 'clock-shadows'
                ? {
                    bg: 'from-[#191424] via-[#14101D] to-[#0F0C16]',
                    border: 'border-slate-700/60 group-hover:border-slate-500/90',
                    innerFrame: 'border-slate-700/50',
                    foil: 'text-slate-300',
                    shadow: 'group-hover:shadow-[0_12px_28px_rgba(46,36,61,0.35)]',
                  }
                : book.id === 'ghost-cellist'
                ? {
                    bg: 'from-[#141926] via-[#101420] to-[#0D101A]',
                    border: 'border-slate-700/60 group-hover:border-slate-500/90',
                    innerFrame: 'border-slate-700/50',
                    foil: 'text-slate-300',
                    shadow: 'group-hover:shadow-[0_12px_28px_rgba(30,41,59,0.35)]',
                  }
                : {
                    bg: 'from-[#111C17] via-[#0E1612] to-[#0A100D]',
                    border: 'border-slate-700/60 group-hover:border-slate-500/90',
                    innerFrame: 'border-slate-700/50',
                    foil: 'text-slate-300',
                    shadow: 'group-hover:shadow-[0_12px_28px_rgba(20,38,30,0.35)]',
                  };

            return (
              <div
                key={book.id}
                onClick={() => {
                  spookyAudio.playPageTurn();
                  onSelectBook(book);
                }}
                className={`group relative rounded-t-[2.25rem] rounded-b-xl bg-gradient-to-b ${cardPalette.bg} border-2 ${cardPalette.border} p-5 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between min-h-[430px] select-none shadow-xl ${cardPalette.shadow}`}
              >
                {/* Vintage Book Spine Ribs on the left */}
                <div className="absolute top-4 bottom-4 left-3 w-1 border-r border-dashed border-slate-600/40" />

                {/* Elegant Embossed Ornate Frame on the Cover */}
                <div className={`relative w-full h-full p-3 rounded-t-[1.75rem] rounded-b-lg border ${cardPalette.innerFrame} bg-[#0A0D17]/40 flex flex-col justify-between`}>
                  
                  {/* Decorative Corner Flourishes */}
                  <div className="absolute top-1 left-2 text-[10px] text-slate-500 font-serif select-none">⌜</div>
                  <div className="absolute top-1 right-2 text-[10px] text-slate-500 font-serif select-none">⌝</div>
                  <div className="absolute bottom-1 left-2 text-[10px] text-slate-500 font-serif select-none">⌞</div>
                  <div className="absolute bottom-1 right-2 text-[10px] text-slate-500 font-serif select-none">⌟</div>

                  <div>
                    {/* Header Row: Roman Numeral & Status */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-[11px] font-gothic tracking-widest text-slate-400 font-bold uppercase">
                        LIBER {['I', 'II', 'III', 'IV'][idx]}
                      </span>

                      {isClaimed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-emerald-300 border border-slate-700 shadow-sm">
                          <Check size={10} /> АВСАН
                        </span>
                      ) : hasStarted ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {currentSavedPage}-р нүүр
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800/80 text-slate-400 border border-slate-700/60">
                          ШИНЭ
                        </span>
                      )}
                    </div>

                    {/* Ornate Vector Medallion Centerpiece */}
                    <div className="relative w-28 h-28 mx-auto my-2 rounded-2xl bg-[#080A12] border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-inner">
                      {/* Subtle concentric filigree ring */}
                      <div className="absolute inset-1.5 rounded-xl border border-dashed border-slate-700/40 pointer-events-none" />
                      <BookIconEmblem bookId={book.id} />
                    </div>

                    {/* Title & Prose with Typographic Dignity */}
                    <div className="space-y-1.5 text-center mt-3 px-1">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block">
                        {book.genre}
                      </span>
                      <h3 className="text-base font-bold font-gothic text-slate-100 group-hover:text-slate-200 transition-colors leading-snug tracking-wide">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-serif italic pt-0.5">
                        {book.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Gold/Silver Foil Stamp Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs px-1">
                    <div className="flex items-center gap-1 font-mono font-bold text-amber-300/90">
                      <span>🍬</span>
                      <span>+{book.candiesReward + book.bonusCandies}</span>
                    </div>

                    <span className="flex items-center gap-1 text-slate-400 group-hover:text-slate-200 font-semibold transition-colors">
                      <span>Нээх</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Information Footer */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-slate-400" />
          <span>Таны уншсан нүүр болон сонгосон хариултууд автоматаар хадгалагдана.</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-slate-400">
          <span>Тайлагдсан ном: {Object.keys(userProgress.claimedBookRewards).length} / {books.length}</span>
          <span>·</span>
          <span>Нээсэн цом: {userProgress.unlockedTrophies.length} / {books.length}</span>
        </div>
      </div>

    </div>
  );
};
