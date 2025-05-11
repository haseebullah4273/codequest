import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CodingProblem, ProblemFilters, UserProgress } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import {
  loadStorageState,
  saveStorageState,
  saveProblem as saveToStorage,
  removeSavedProblem,
  incrementCompletedProblems,
  storeProblems,
  getProblems
} from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface ProblemContextType {
  problems: CodingProblem[];
  savedProblems: CodingProblem[];
  isLoading: boolean;
  filters: ProblemFilters;
  progress: UserProgress;
  
  setFilters: (filters: Partial<ProblemFilters>) => void;
  generateProblems: () => Promise<void>;
  regenerateProblem: (index: number) => Promise<void>;
  surpriseMe: () => Promise<void>;
  saveProblem: (problem: CodingProblem) => void;
  unsaveProblem: (problemId: string) => void;
  toggleHints: (problem: CodingProblem) => void;
  showNextHint: (problem: CodingProblem) => void;
  showSolution: (problem: CodingProblem) => void;
  markCompleted: () => void;
}

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

export function ProblemProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [problems, setProblems] = useState<CodingProblem[]>([]);
  const [savedProblems, setSavedProblems] = useState<CodingProblem[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    dailyCompleted: 0,
    dailyTotal: 10,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0]
  });
  
  const [filters, setFiltersState] = useState<ProblemFilters>({
    language: "python",
    topics: ["variables", "loops", "functions"],
    difficulty: ["easy"],
    customInstructions: "",
    numQuestions: 2,
    learningFocus: "basic-learning"
  });

  // Load state from localStorage on initial mount
  useEffect(() => {
    const state = loadStorageState();
    setProblems(state.problems);
    setSavedProblems(state.savedProblems);
    setProgress(state.progress);
    
    // Check if it's a new day and reset dailyCompleted
    const today = new Date().toISOString().split('T')[0];
    if (state.progress.lastActiveDate !== today) {
      setProgress(prev => ({
        ...prev,
        dailyCompleted: 0,
        lastActiveDate: today
      }));
    }
  }, []);

  // Save problems to localStorage whenever they change
  useEffect(() => {
    const state = loadStorageState();
    saveStorageState({
      ...state,
      problems,
      savedProblems,
      progress
    });
  }, [problems, savedProblems, progress]);

  const setFilters = (newFilters: Partial<ProblemFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const generateProblems = async () => {
    try {
      if (filters.topics.length === 0 || filters.difficulty.length === 0) {
        toast({
          title: "Selection Required",
          description: "Please select at least one topic and difficulty level.",
          variant: "destructive"
        });
        return;
      }

      setIsLoading(true);

      const response = await apiRequest("POST", "/api/problems/generate", {
        language: filters.language,
        topics: filters.topics,
        difficulty: filters.difficulty,
        customInstructions: filters.customInstructions,
        count: filters.numQuestions,
        learningFocus: filters.learningFocus,
        frameworkName: filters.frameworkName
      });

      const data = await response.json();
      
      // Transform the problems to include UI state
      const newProblems = data.problems.map((problem: any) => ({
        ...problem,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        showHints: false,
        showSolution: false,
        hintIndex: 0,
        saved: false
      }));

      setProblems(newProblems);
      storeProblems(newProblems);
      
      toast({
        title: "Problems Generated",
        description: `Successfully generated ${newProblems.length} new ${filters.language} problems.`
      });
    } catch (error) {
      console.error("Error generating problems:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate problems. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateProblem = async (index: number) => {
    try {
      if (index < 0 || index >= problems.length) {
        throw new Error("Invalid problem index");
      }

      setIsLoading(true);

      // Generate a single problem with the same settings
      const response = await apiRequest("POST", "/api/problems/generate", {
        language: filters.language,
        topics: filters.topics,
        difficulty: filters.difficulty,
        customInstructions: filters.customInstructions,
        count: 1,
        learningFocus: filters.learningFocus,
        frameworkName: filters.frameworkName
      });

      const data = await response.json();
      
      if (!data.problems || data.problems.length === 0) {
        throw new Error("Failed to generate a new problem");
      }
      
      // Transform the new problem to include UI state
      const newProblem = {
        ...data.problems[0],
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        showHints: false,
        showSolution: false,
        hintIndex: 0,
        saved: false
      };

      // Replace the problem at the specified index
      const updatedProblems = [...problems];
      updatedProblems[index] = newProblem;
      setProblems(updatedProblems);
      storeProblems(updatedProblems);

      toast({
        title: "Problem Regenerated",
        description: "Successfully generated a new problem."
      });
    } catch (error) {
      console.error("Error regenerating problem:", error);
      toast({
        title: "Regeneration Failed",
        description: error instanceof Error ? error.message : "Failed to regenerate the problem. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const surpriseMe = async () => {
    try {
      setIsLoading(true);

      // Randomly select language, topics, and difficulty
      const languages = ["python", "javascript", "cpp", "java", "ruby", "go", "rust", "typescript"];
      const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
      
      // Import dynamically to avoid circular dependencies
      const { topicsByLanguage } = await import("@/lib/topics");
      const allTopics = topicsByLanguage[randomLanguage] || [];
      
      // Select 1-3 random topics
      const numTopics = Math.floor(Math.random() * 3) + 1;
      const randomTopics: string[] = [];
      
      for (let i = 0; i < numTopics; i++) {
        const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
        if (!randomTopics.includes(randomTopic)) {
          randomTopics.push(randomTopic);
        }
      }
      
      // Select a random difficulty
      const difficulties = ["easy", "medium", "hard"];
      const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      
      // Generate 1-3 random questions
      const numQuestions = Math.floor(Math.random() * 3) + 1;
      
      // Update filters
      const surpriseFilters = {
        language: randomLanguage,
        topics: randomTopics,
        difficulty: [randomDifficulty],
        numQuestions
      };
      
      setFiltersState(prev => ({ ...prev, ...surpriseFilters }));
      
      // Generate problems with the surprise filters
      const response = await apiRequest("POST", "/api/problems/generate", {
        language: randomLanguage,
        topics: randomTopics,
        difficulty: [randomDifficulty],
        customInstructions: "Make this fun and creative!",
        count: numQuestions
      });

      const data = await response.json();
      
      // Transform the problems to include UI state
      const newProblems = data.problems.map((problem: any) => ({
        ...problem,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        showHints: false,
        showSolution: false,
        hintIndex: 0,
        saved: false
      }));

      setProblems(newProblems);
      storeProblems(newProblems);
      
      toast({
        title: "Surprise Problems!",
        description: `Generated ${newProblems.length} surprise ${randomLanguage} problems for you.`
      });
    } catch (error) {
      console.error("Error generating surprise problems:", error);
      toast({
        title: "Surprise Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate surprise problems. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveProblem = (problem: CodingProblem) => {
    const updatedProblem = { ...problem, saved: true };
    
    // Update the problem in the problems array
    const updatedProblems = problems.map(p => 
      p.id === problem.id ? updatedProblem : p
    );
    
    setProblems(updatedProblems);
    
    // Add to savedProblems if not already there
    if (!savedProblems.some(p => p.id === problem.id)) {
      setSavedProblems([...savedProblems, updatedProblem]);
    }
    
    // Save to storage
    saveToStorage(updatedProblem);
    
    toast({
      title: "Problem Saved",
      description: "The problem has been saved for later."
    });
  };

  const unsaveProblem = (problemId: string) => {
    // Update the problem in the problems array
    const updatedProblems = problems.map(p => 
      p.id === problemId ? { ...p, saved: false } : p
    );
    
    setProblems(updatedProblems);
    
    // Remove from savedProblems
    setSavedProblems(savedProblems.filter(p => p.id !== problemId));
    
    // Remove from storage
    removeSavedProblem(problemId);
    
    toast({
      title: "Problem Unsaved",
      description: "The problem has been removed from your saved list."
    });
  };

  const toggleHints = (problem: CodingProblem) => {
    const updatedProblems = problems.map(p => 
      p.id === problem.id ? { ...p, showHints: !p.showHints } : p
    );
    
    setProblems(updatedProblems);
  };

  const showNextHint = (problem: CodingProblem) => {
    if (problem.hintIndex >= problem.hints.length - 1) return;
    
    const updatedProblems = problems.map(p => 
      p.id === problem.id ? { ...p, hintIndex: p.hintIndex + 1 } : p
    );
    
    setProblems(updatedProblems);
  };

  const showSolution = (problem: CodingProblem) => {
    const updatedProblems = problems.map(p => 
      p.id === problem.id ? { ...p, showSolution: true } : p
    );
    
    setProblems(updatedProblems);
    
    // Marking a problem as completed when viewing the solution
    markCompleted();
  };

  const markCompleted = () => {
    incrementCompletedProblems();
    
    // Update the progress in the state
    const state = loadStorageState();
    setProgress(state.progress);
  };

  return (
    <ProblemContext.Provider
      value={{
        problems,
        savedProblems,
        isLoading,
        filters,
        progress,
        setFilters,
        generateProblems,
        regenerateProblem,
        surpriseMe,
        saveProblem,
        unsaveProblem,
        toggleHints,
        showNextHint,
        showSolution,
        markCompleted
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
}

export function useProblemContext() {
  const context = useContext(ProblemContext);
  if (context === undefined) {
    throw new Error("useProblemContext must be used within a ProblemProvider");
  }
  return context;
}
