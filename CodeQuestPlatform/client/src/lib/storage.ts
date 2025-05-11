import { StorageState, CodingProblem, DailyChallenge, UserProgress } from "./types";

const STORAGE_KEY = "codequest-storage";

// Default storage state
const defaultStorageState: StorageState = {
  problems: [],
  savedProblems: [],
  dailyChallenge: null,
  progress: {
    dailyCompleted: 0,
    dailyTotal: 10,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0]
  },
  darkMode: false
};

// Load the state from localStorage
export const loadStorageState = (): StorageState => {
  try {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (!storedState) return defaultStorageState;
    
    return JSON.parse(storedState) as StorageState;
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
    return defaultStorageState;
  }
};

// Save the state to localStorage
export const saveStorageState = (state: StorageState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};

// Save a problem
export const saveProblem = (problem: CodingProblem): void => {
  try {
    const state = loadStorageState();
    const problemExists = state.savedProblems.some(p => p.id === problem.id);
    
    if (!problemExists) {
      state.savedProblems = [...state.savedProblems, problem];
      saveStorageState(state);
    }
  } catch (error) {
    console.error("Failed to save problem:", error);
  }
};

// Remove a saved problem
export const removeSavedProblem = (problemId: string): void => {
  try {
    const state = loadStorageState();
    state.savedProblems = state.savedProblems.filter(p => p.id !== problemId);
    saveStorageState(state);
  } catch (error) {
    console.error("Failed to remove saved problem:", error);
  }
};

// Set daily challenge
export const setDailyChallenge = (problem: CodingProblem): void => {
  try {
    const state = loadStorageState();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    state.dailyChallenge = {
      problem: problem,
      expiresAt: tomorrow.getTime()
    };
    
    saveStorageState(state);
  } catch (error) {
    console.error("Failed to set daily challenge:", error);
  }
};

// Get daily challenge (or null if expired)
export const getDailyChallenge = (): DailyChallenge | null => {
  try {
    const state = loadStorageState();
    if (!state.dailyChallenge) return null;
    
    if (state.dailyChallenge.expiresAt < Date.now()) {
      // Challenge expired
      state.dailyChallenge = null;
      saveStorageState(state);
      return null;
    }
    
    return state.dailyChallenge;
  } catch (error) {
    console.error("Failed to get daily challenge:", error);
    return null;
  }
};

// Update user progress
export const updateProgress = (progress: Partial<UserProgress>): void => {
  try {
    const state = loadStorageState();
    state.progress = { ...state.progress, ...progress };
    saveStorageState(state);
  } catch (error) {
    console.error("Failed to update progress:", error);
  }
};

// Increment completed daily problems
export const incrementCompletedProblems = (): void => {
  try {
    const state = loadStorageState();
    
    // Update last active date and check for streak
    const today = new Date().toISOString().split('T')[0];
    const lastActive = state.progress.lastActiveDate;
    
    if (lastActive !== today) {
      // It's a new day
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastActive === yesterdayStr) {
        // Streak continues
        state.progress.streak += 1;
      } else {
        // Streak broken
        state.progress.streak = 1;
      }
      
      state.progress.lastActiveDate = today;
      state.progress.dailyCompleted = 1;
    } else {
      // Same day, increment completed
      state.progress.dailyCompleted = Math.min(
        state.progress.dailyCompleted + 1,
        state.progress.dailyTotal
      );
    }
    
    saveStorageState(state);
  } catch (error) {
    console.error("Failed to increment completed problems:", error);
  }
};

// Store problems
export const storeProblems = (problems: CodingProblem[]): void => {
  try {
    const state = loadStorageState();
    state.problems = problems;
    saveStorageState(state);
  } catch (error) {
    console.error("Failed to store problems:", error);
  }
};

// Get stored problems
export const getProblems = (): CodingProblem[] => {
  try {
    const state = loadStorageState();
    return state.problems;
  } catch (error) {
    console.error("Failed to get problems:", error);
    return [];
  }
};
