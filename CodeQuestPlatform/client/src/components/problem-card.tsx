import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  FileText,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  Play
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { CodeEditor } from "@/components/ui/code-editor";
import { useProblemContext } from "@/contexts/problem-context";
import { CodingProblem } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

interface ProblemCardProps {
  problem: CodingProblem;
  index: number;
}

export function ProblemCard({ problem, index }: ProblemCardProps) {
  const {
    toggleHints,
    showNextHint,
    showSolution,
    saveProblem,
    unsaveProblem,
    regenerateProblem
  } = useProblemContext();
  
  const [showSolutionDialog, setShowSolutionDialog] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  const handleToggleHints = () => {
    toggleHints(problem);
  };

  const handleShowNextHint = () => {
    showNextHint(problem);
  };

  const handleSolutionClick = () => {
    setShowSolutionDialog(true);
  };

  const handleConfirmShowSolution = () => {
    showSolution(problem);
    setShowSolutionDialog(false);
  };

  const handleSaveToggle = () => {
    if (problem.saved) {
      unsaveProblem(problem.id);
    } else {
      saveProblem(problem);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await regenerateProblem(index);
    setIsRegenerating(false);
  };
  
  const handleRunOnline = () => {
    setShowCodeEditor(true);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-wrap justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{problem.title}</h3>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {problem.language}
            </Badge>
            <Badge 
              variant="outline" 
              className={`
                ${problem.difficulty === 'easy' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : problem.difficulty === 'medium'
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'bg-rose-500/10 text-rose-500'
                }
              `}
            >
              {problem.difficulty}
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {problem.description}
        </p>
        
        {/* Topic Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {problem.topics.map((topic, i) => (
            <Badge key={i} variant="outline" className="bg-gray-100 dark:bg-gray-700">
              {topic}
            </Badge>
          ))}
        </div>
        
        {/* Hints Section */}
        {problem.showHints && (
          <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Hints:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {problem.hints.slice(0, problem.hintIndex + 1).map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
            {problem.hintIndex < problem.hints.length - 1 && (
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
        {problem.showSolution && (
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
            variant={problem.showHints ? "default" : "outline"} 
            onClick={handleToggleHints}
            className={problem.showHints ? "bg-primary text-white" : ""}
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            {problem.showHints ? "Hide Hints" : "Show Hints"}
          </Button>
          
          {!problem.showSolution && (
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
            onClick={handleSaveToggle}
          >
            {problem.saved ? (
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
          
          <Button 
            variant="outline" 
            onClick={handleRegenerate}
            disabled={isRegenerating}
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isRegenerating ? "animate-spin" : ""}`} />
            {isRegenerating ? "Regenerating..." : "Regenerate"}
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={handleRunOnline}
          >
            <Play className="h-5 w-5 mr-2" />
            Run Online
          </Button>
        </div>
        
        {/* Code Editor Dialog */}
        <CodeEditor
          isOpen={showCodeEditor}
          onClose={() => setShowCodeEditor(false)}
          problemTitle={problem.title}
          problemDescription={problem.description}
          language={problem.language}
          initialCode=""
          solutionCode={problem.solution}
        />
      </CardContent>

      {/* Solution Confirmation Dialog */}
      <Dialog open={showSolutionDialog} onOpenChange={setShowSolutionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-center">Wait! Want to give it one more try? 💪</DialogTitle>
          <DialogDescription className="text-center">
            You learn best by solving problems yourself. Are you sure you want to see the solution?
          </DialogDescription>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setShowSolutionDialog(false)}
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
    </Card>
  );
}
