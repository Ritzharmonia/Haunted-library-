import React, { useState } from 'react';
import { Book, Question } from '../types/game';
import { CheckCircle2, XCircle, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';
import { BookIconEmblem } from './WhimsicalAssets';
import { spookyAudio } from '../utils/audio';

interface QuestionModalProps {
  book: Book;
  currentStage: 'STAGE1' | 'STAGE2';
  savedAnswers: Record<string, string>; // questionId -> optionId
  onRecordAnswer: (questionId: string, optionId: string) => void;
  onProceedToDoors: () => void;
  onSwitchToStage2: () => void;
  onReturnToBook: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  book,
  currentStage,
  savedAnswers,
  onRecordAnswer,
  onProceedToDoors,
  onSwitchToStage2,
  onReturnToBook
}) => {
  const isStage1 = currentStage === 'STAGE1';
  const questions: Question[] = isStage1 ? book.stage1Questions : book.stage2Questions;

  const [questionIdx, setQuestionIdx] = useState(0);
  const [stageFinished, setStageFinished] = useState(false);

  const currentQ = questions[questionIdx];
  const selectedOptionId = savedAnswers[currentQ.id];
  const hasAnswered = Boolean(selectedOptionId);
  const isCurrentCorrect = selectedOptionId === currentQ.correctOptionId;

  const correctCount = questions.filter(q => savedAnswers[q.id] === q.correctOptionId).length;
  const isAllCorrect = correctCount === questions.length;

  const handleSelectOption = (optionId: string) => {
    if (hasAnswered) return;
    onRecordAnswer(currentQ.id, optionId);
    if (optionId === currentQ.correctOptionId) {
      spookyAudio.playChime();
    } else {
      spookyAudio.playWrongSound();
    }
  };

  const handleNextQuestion = () => {
    spookyAudio.playPageTurn();
    if (questionIdx < questions.length - 1) {
      setQuestionIdx(questionIdx + 1);
    } else {
      setStageFinished(true);
    }
  };

  const handleReviewPrev = () => {
    if (questionIdx > 0) {
      spookyAudio.playPageTurn();
      setQuestionIdx(questionIdx - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0F1222] border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
              <BookIconEmblem bookId={book.id} className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isStage1 ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50' : 'bg-purple-950 text-purple-300 border border-purple-500/50'
                }`}>
                  {isStage1 ? 'ЭХНИЙ ШАТ' : 'ХОЁРДУГААР ШАТ'}
                </span>
                <span className="text-xs text-slate-300 font-medium">· {book.title}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Зохиолын логик утгыг шалгах асуултад үнэн зөв хариулна уу.
              </p>
            </div>
          </div>

          <button
            onClick={onReturnToBook}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 hover:text-cyan-300 bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
            title="Зохиол харах"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Зохиол харах</span>
          </button>
        </div>

        {/* Finished summary or active questions */}
        {stageFinished ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl shadow-inner">
              {isAllCorrect ? '🗝️' : '🕯️'}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold font-gothic text-slate-100">
                {isAllCorrect
                  ? 'Гайхалтай! Бүх асуултад зөв хариуллаа!'
                  : `Шат дууслаа: 3-аас ${correctCount} асуултад зөв хариулсан.`}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {isStage1 && isAllCorrect
                  ? 'Та номын зохиолын нууцыг бүрэн тайлсан тул шууд Эцсийн хоёр хаалганы сорилт руу шилжих эрх нээгдлээ!'
                  : isStage1 && !isAllCorrect
                  ? 'Эхний шатанд алдаа гарсан тул зохиолын илүү гүн сэжүүрт үндэслэсэн ХОЁРДУГААР ШАТ-ны 3 асуултыг тайлах шаардлагатай.'
                  : 'Хоёрдугаар шат дууслаа! Одоо Сарны тамга ба Хар сүүдрийн эцсийн хаалгыг сонгоно уу.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setStageFinished(false);
                  setQuestionIdx(0);
                }}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors w-full sm:w-auto cursor-pointer"
              >
                Хариултуудыг дахин харах
              </button>

              {isStage1 && !isAllCorrect ? (
                <button
                  onClick={() => {
                    spookyAudio.playPageTurn();
                    setStageFinished(false);
                    setQuestionIdx(0);
                    onSwitchToStage2();
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-purple-400 to-indigo-300 hover:from-purple-300 transition-all font-gothic tracking-wider w-full sm:w-auto cursor-pointer"
                >
                  <span>ХОЁРДУГААР ШАТЫГ ЭХЛҮҮЛЭХ</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    spookyAudio.playChime();
                    onProceedToDoors();
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 transition-all font-gothic tracking-wider w-full sm:w-auto cursor-pointer"
                >
                  <span>ЭЦСИЙН ХААЛГА РУУ ОЧИХ</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Question View */
          <div className="mt-6 space-y-6">
            
            {/* Step indicators */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Асуулт {questionIdx + 1} / {questions.length}</span>
              <div className="flex items-center gap-1.5">
                {questions.map((q, idx) => {
                  const answered = Boolean(savedAnswers[q.id]);
                  const isCorrect = savedAnswers[q.id] === q.correctOptionId;
                  return (
                    <div
                      key={q.id}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        idx === questionIdx
                          ? 'ring-2 ring-cyan-400 bg-cyan-400'
                          : answered
                          ? isCorrect
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                          : 'bg-slate-700'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Prompt */}
            <div className="bg-[#14172B] p-4 rounded-2xl border border-slate-700/80">
              <h4 className="text-base sm:text-lg font-bold text-slate-100 font-gothic leading-relaxed">
                {currentQ.questionText}
              </h4>
            </div>

            {/* 4 Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentQ.correctOptionId;

                let btnStyle = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-700/80 hover:border-slate-600';

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-sm';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle} ${
                      !hasAnswered ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle size={18} className="text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate feedback & explanation */}
            {hasAnswered && (
              <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 animate-in fade-in-50 duration-200 ${
                isCurrentCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-bold">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span>ЗӨВ ХАРИУЛЛАА!</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} className="text-rose-400" />
                      <span>БУРУУ ХАРИУЛТ</span>
                    </>
                  )}
                  <span className="text-slate-400 text-xs font-normal">
                    (Зохиолын сэжүүр: {currentQ.clueReference})
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Nav */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handleReviewPrev}
                disabled={questionIdx === 0}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition-colors ${
                  questionIdx === 0
                    ? 'opacity-30 text-slate-600 cursor-not-allowed'
                    : 'text-slate-300 hover:text-white bg-slate-800'
                }`}
              >
                Өмнөх асуулт
              </button>

              {hasAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md cursor-pointer"
                >
                  <span>{questionIdx < questions.length - 1 ? 'Дараагийн асуулт' : 'Үр дүн үзэх'}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
