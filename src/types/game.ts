export interface StoryPage {
  id: number;
  title: string;
  chapterNumber: string;
  content: string[];
  clue?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  clueReference: string;
}

export interface BookCurse {
  title: string;
  description: string;
  effect: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  themeColor: string; // Tailwind color accent
  badgeColor: string;
  glowColor: string;
  coverImage: string;
  candiesReward: number;
  bonusCandies: number;
  trophyId: string;
  trophyTitle: string;
  trophyDescription: string;
  trophyIcon: string;
  safeDoor: 'MOON' | 'SHADOW'; // 'MOON' = Сарны тамга, 'SHADOW' = Хар сүүдэр
  safeDoorHint: string;
  trapCurse: BookCurse;
  prologue: string;
  pages: StoryPage[]; // 3 pages: 1, 2, 3
  stage1Questions: Question[]; // 3 questions
  stage2Questions: Question[]; // 3 questions
}

export interface SavedUserProgress {
  candyCount: number;
  claimedBookRewards: Record<string, boolean>; // bookId -> boolean (strictly once!)
  currentBookPage: Record<string, number>; // bookId -> page index (0: prologue, 1..3: pages)
  bookStage: Record<string, 'READING' | 'STAGE1' | 'STAGE2' | 'DOORS' | 'COMPLETED' | 'CURSED'>;
  selectedAnswers: Record<string, Record<string, string>>; // bookId -> { qId: optionId }
  unlockedTrophies: string[]; // list of trophyIds
  historyLog: {
    timestamp: number;
    bookTitle: string;
    action: string;
    rewardGranted?: number;
  }[];
  soundEnabled: boolean;
}
