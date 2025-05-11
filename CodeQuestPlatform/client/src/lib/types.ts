export interface CodingProblem {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: string;
  topics: string[];
  hints: string[];
  solution: string;
  
  // UI state properties
  showHints: boolean;
  showSolution: boolean;
  hintIndex: number;
  saved: boolean;
}

export type LearningFocus = 
  | "data-structures-algorithms" 
  | "job-preparation" 
  | "basic-learning" 
  | "framework-specific";

export interface ProblemFilters {
  language: string;
  topics: string[];
  difficulty: string[];
  customInstructions: string;
  numQuestions: number;
  learningFocus?: LearningFocus;
  frameworkName?: string;
}

export interface DailyChallenge {
  problem: CodingProblem;
  expiresAt: number;
}

export interface UserProgress {
  dailyCompleted: number;
  dailyTotal: number;
  streak: number;
  lastActiveDate: string;
}

export interface StorageState {
  problems: CodingProblem[];
  savedProblems: CodingProblem[];
  dailyChallenge: DailyChallenge | null;
  progress: UserProgress;
  darkMode: boolean;
}
