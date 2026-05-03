export interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  category: string;
}

export interface GrammarQuestion {
  id: string;
  sentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GameState {
  score: number;
  unlockedPrize: boolean;
  lives: number;
}

export type View = 'home' | 'vocab' | 'grammar' | 'reading' | 'reward';
