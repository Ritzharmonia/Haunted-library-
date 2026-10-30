import { SavedUserProgress } from '../types/game';

const STORAGE_KEY = 'halloween_haunted_library_progress_v2';

export const INITIAL_PROGRESS: SavedUserProgress = {
  candyCount: 50, // Starting festive candies
  claimedBookRewards: {},
  currentBookPage: {},
  bookStage: {},
  selectedAnswers: {},
  unlockedTrophies: [],
  historyLog: [
    {
      timestamp: Date.now(),
      bookTitle: 'Сүнстэй номын сан',
      action: 'Хэллоуины шилтгээний үүдэнд зочилж 50 чихэр бэлгэнд авлаа.'
    }
  ],
  soundEnabled: true
};

export function loadUserProgress(): SavedUserProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      claimedBookRewards: parsed.claimedBookRewards || {},
      currentBookPage: parsed.currentBookPage || {},
      bookStage: parsed.bookStage || {},
      selectedAnswers: parsed.selectedAnswers || {},
      unlockedTrophies: parsed.unlockedTrophies || [],
      historyLog: parsed.historyLog || INITIAL_PROGRESS.historyLog
    };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: SavedUserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}
