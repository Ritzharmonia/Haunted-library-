import React, { useState } from 'react';
import { Book, SavedUserProgress } from '../types/game';
import { HAUNTED_BOOKS } from '../data/books';
import { BookShelf } from './BookShelf';
import { BookReader } from './BookReader';
import { QuestionModal } from './QuestionModal';
import { GothicDoors } from './GothicDoors';
import { spookyAudio } from '../utils/audio';

interface HauntedLibraryProps {
  userProgress: SavedUserProgress;
  onUpdateProgress: (updated: SavedUserProgress) => void;
}

export const HauntedLibrary: React.FC<HauntedLibraryProps> = ({
  userProgress,
  onUpdateProgress
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [libraryMode, setLibraryMode] = useState<'SHELF' | 'READING' | 'QUESTIONS' | 'DOORS'>('SHELF');
  const [questionStage, setQuestionStage] = useState<'STAGE1' | 'STAGE2'>('STAGE1');

  // Handle choosing a book from the shelf
  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    const savedStage = userProgress.bookStage[book.id];

    if (savedStage === 'DOORS') {
      setLibraryMode('DOORS');
    } else if (savedStage === 'STAGE2') {
      setQuestionStage('STAGE2');
      setLibraryMode('QUESTIONS');
    } else if (savedStage === 'STAGE1') {
      setQuestionStage('STAGE1');
      setLibraryMode('QUESTIONS');
    } else {
      setLibraryMode('READING');
    }
  };

  // Change page in reader
  const handlePageChange = (newIndex: number) => {
    if (!selectedBook) return;
    const updated: SavedUserProgress = {
      ...userProgress,
      currentBookPage: {
        ...userProgress.currentBookPage,
        [selectedBook.id]: newIndex
      }
    };
    onUpdateProgress(updated);
  };

  // Trigger "НУУЦЫГ ТАЙЛАХ"
  const handleUnravelSecret = () => {
    if (!selectedBook) return;
    setQuestionStage('STAGE1');
    setLibraryMode('QUESTIONS');

    const updated: SavedUserProgress = {
      ...userProgress,
      bookStage: {
        ...userProgress.bookStage,
        [selectedBook.id]: 'STAGE1'
      }
    };
    onUpdateProgress(updated);
  };

  // Save selected answer for a question
  const handleRecordAnswer = (questionId: string, optionId: string) => {
    if (!selectedBook) return;
    const currentBookAnswers = userProgress.selectedAnswers[selectedBook.id] || {};
    const updated: SavedUserProgress = {
      ...userProgress,
      selectedAnswers: {
        ...userProgress.selectedAnswers,
        [selectedBook.id]: {
          ...currentBookAnswers,
          [questionId]: optionId
        }
      }
    };
    onUpdateProgress(updated);
  };

  // Move from Questions to Gothic Doors
  const handleProceedToDoors = () => {
    if (!selectedBook) return;
    setLibraryMode('DOORS');

    const updated: SavedUserProgress = {
      ...userProgress,
      bookStage: {
        ...userProgress.bookStage,
        [selectedBook.id]: 'DOORS'
      }
    };
    onUpdateProgress(updated);
  };

  // Switch to Stage 2 questions if Stage 1 failed
  const handleSwitchToStage2 = () => {
    if (!selectedBook) return;
    setQuestionStage('STAGE2');

    const updated: SavedUserProgress = {
      ...userProgress,
      bookStage: {
        ...userProgress.bookStage,
        [selectedBook.id]: 'STAGE2'
      }
    };
    onUpdateProgress(updated);
  };

  // Return to Reading from Questions or Doors
  const handleReturnToBook = () => {
    setLibraryMode('READING');
  };

  // Return to Bookshelf
  const handleReturnToShelf = () => {
    setSelectedBook(null);
    setLibraryMode('SHELF');
  };

  // Claim final reward from Safe Door (strictly once per book!)
  const handleClaimReward = (candies: number, trophyId: string) => {
    if (!selectedBook) return;
    if (userProgress.claimedBookRewards[selectedBook.id]) return; // Guard

    const newCandyCount = userProgress.candyCount + candies;
    const newClaimed = {
      ...userProgress.claimedBookRewards,
      [selectedBook.id]: true
    };
    const newTrophies = userProgress.unlockedTrophies.includes(trophyId)
      ? userProgress.unlockedTrophies
      : [...userProgress.unlockedTrophies, trophyId];

    const newLog = [
      {
        timestamp: Date.now(),
        bookTitle: selectedBook.title,
        action: `Аюулгүй хаалгыг амжилттай нээж +${candies} чихэр болон "${selectedBook.trophyTitle}" цом хүртлээ!`,
        rewardGranted: candies
      },
      ...userProgress.historyLog
    ];

    const updated: SavedUserProgress = {
      ...userProgress,
      candyCount: newCandyCount,
      claimedBookRewards: newClaimed,
      unlockedTrophies: newTrophies,
      bookStage: {
        ...userProgress.bookStage,
        [selectedBook.id]: 'COMPLETED'
      },
      historyLog: newLog
    };

    onUpdateProgress(updated);
  };

  return (
    <div className="space-y-6">
      {/* Shelf view */}
      <BookShelf
        books={HAUNTED_BOOKS}
        userProgress={userProgress}
        onSelectBook={handleSelectBook}
      />

      {/* Reader Modal */}
      {selectedBook && libraryMode === 'READING' && (
        <BookReader
          book={selectedBook}
          currentPageIndex={userProgress.currentBookPage[selectedBook.id] ?? 0}
          onPageChange={handlePageChange}
          onUnravelSecret={handleUnravelSecret}
          onClose={handleReturnToShelf}
        />
      )}

      {/* Questions Modal */}
      {selectedBook && libraryMode === 'QUESTIONS' && (
        <QuestionModal
          book={selectedBook}
          currentStage={questionStage}
          savedAnswers={userProgress.selectedAnswers[selectedBook.id] || {}}
          onRecordAnswer={handleRecordAnswer}
          onProceedToDoors={handleProceedToDoors}
          onSwitchToStage2={handleSwitchToStage2}
          onReturnToBook={handleReturnToBook}
        />
      )}

      {/* Doors View */}
      {selectedBook && libraryMode === 'DOORS' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl my-auto">
            <GothicDoors
              book={selectedBook}
              isRewardAlreadyClaimed={Boolean(userProgress.claimedBookRewards[selectedBook.id])}
              onClaimReward={(candies, trophyId) => handleClaimReward(candies, trophyId)}
              onReturnToLibrary={handleReturnToShelf}
              onRereadBook={handleReturnToBook}
            />
          </div>
        </div>
      )}
    </div>
  );
};
