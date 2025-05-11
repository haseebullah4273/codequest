import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, FileText, Bookmark, BookmarkCheck } from "lucide-react";
import { CodingProblem } from "@/lib/types";
import { CodeBlock } from "@/components/ui/code-block";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { useProblemContext } from "@/contexts/problem-context";

interface DailyChallengeProps {
  initialProblem?: CodingProblem;
}

export function DailyChallenge({ initialProblem }: DailyChallengeProps) {
  const { saveProblem, unsaveProblem } = useProblemContext();
  const [timeRemaining, setTimeRemaining] = useState("23:59:59");
  const [problem, setProblem] = useState<CodingProblem | undefined>(initialProblem);
  const [showHints, setShowHints] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (initialProblem) {
      setProblem(initialProblem);
      setIsSaved(initialProblem.saved);
    } else {
      // If no initial problem, create a sample one
      setProblem({
        id: "daily-sample",
        title: "String Reversal Function",
        description: "Write a function that takes a string as input and returns the string reversed. For example, if the input is \"hello\", the output should be \"olleh\".",
        language: "python",
        difficulty: "easy",
        topics: ["strings", "functions"],
        hints: [
          "Think about how to access individual characters in a string.",
          "Remember that strings can be treated like arrays in many languages.",
          "Consider using a loop to process the string in reverse order.",
          "You might also explore built-in functions or methods specific to your language.",
          "Try using string slicing with a negative step in Python."
        ],
        solution: "def reverse_string(s):\n    return s[::-1]\n\n# Example usage\nprint(reverse_string('hello'))  # Output: olleh",
        showHints: false,
        showSolution: false,
        hintIndex: 0,
        saved: false
      });
    }

    // Update timer every second
    const interval = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [initialProblem]);

  if (!problem) return null;

  const handleHintClick = () => {
    setShowHints(!showHints);
    if (!showHints) setHintIndex(0);
  };

  const handleShowNextHint = () => {
    if (hintIndex < problem.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
  };

  const handleSolutionClick = () => {
    setShowDialog(true);
  };

  const handleConfirmShowSolution = () => {
    setShowSolution(true);
    setShowDialog(false);
  };

  const handleToggleSave = () => {
    if (isSaved) {
      unsaveProblem(problem.id);
      setIsSaved(false);
    } else {
      saveProblem(problem);
      setIsSaved(true);
    }
  };

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/10 to-blue-400/10 dark:from-primary/20 dark:to-blue-400/20 rounded-xl p-6 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <Badge className="bg-primary text-white mb-2">Daily Brain Boost</Badge>
              <h2 className="text-2xl font-bold">Your Daily Coding Challenge</h2>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <span className="text-sm font-medium mr-2">New challenge in:</span>
              <div className="bg-white dark:bg-gray-700 px-3 py-1 rounded font-mono text-primary font-semibold">
                {timeRemaining}
              </div>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-5 md:p-6">
              <h3 className="font-semibold text-lg mb-3">{problem.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {problem.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {problem.language}
                </Badge>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                  {problem.difficulty}
                </Badge>
                {problem.topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {topic}
                  </Badge>
                ))}
              </div>
              
              {/* Hints Section */}
              {showHints && (
                <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Hints:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {problem.hints.slice(0, hintIndex + 1).map((hint, i) => (
                      <li key={i}>{hint}</li>
                    ))}
                  </ul>
                  {hintIndex < problem.hints.length - 1 && (
                    <Button 
                      variant="link" 
                      onClick={handleShowNextHint}
                      className="text-primary p-0 mt-2 h-auto"
                    >
                      Show next hint
                    </Button>
                  )}
                </div>
              )}
              
              {/* Solution Section */}
              {showSolution && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Solution:</h4>
                  <CodeBlock 
                    code={problem.solution} 
                    language={problem.language} 
                  />
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Button 
                  variant={showHints ? "default" : "outline"} 
                  onClick={handleHintClick}
                  className={showHints ? "bg-primary text-white" : ""}
                >
                  <HelpCircle className="h-5 w-5 mr-2" />
                  {showHints ? "Hide Hints" : "Show Hints"}
                </Button>
                
                {!showSolution && (
                  <Button 
                    variant="outline" 
                    onClick={handleSolutionClick}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Show Solution
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={handleToggleSave}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="h-5 w-5 mr-2 text-primary" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-5 w-5 mr-2" />
                      Save for Later
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Solution Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-center">Wait! Want to give it one more try? 💪</DialogTitle>
          <DialogDescription className="text-center">
            You learn best by solving problems yourself. Are you sure you want to see the solution?
          </DialogDescription>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setShowDialog(false)}
            >
              Okay, I'll try 🔋
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleConfirmShowSolution}
            >
              No, Show me the solution 😞
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
