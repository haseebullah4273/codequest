import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, Sparkles, Loader2, 
  BookOpen, Briefcase, Code, BookMarked 
} from "lucide-react";
import { useProblemContext } from "@/contexts/problem-context";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { topicsByLanguage, languageOptions, frameworksByLanguage } from "@/lib/topics";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LearningFocus } from "@/lib/types";

export function ProblemGenerator() {
  const { 
    filters, 
    setFilters, 
    generateProblems, 
    surpriseMe, 
    isLoading 
  } = useProblemContext();
  
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const [availableFrameworks, setAvailableFrameworks] = useState<{ value: string, label: string }[]>([]);
  const [showFrameworkSelector, setShowFrameworkSelector] = useState(false);

  useEffect(() => {
    // Update available topics when language changes
    setAvailableTopics(topicsByLanguage[filters.language] || []);
    
    // Update available frameworks
    setAvailableFrameworks(frameworksByLanguage[filters.language] || []);
    
    // If learning focus is framework-specific, show framework selector
    setShowFrameworkSelector(filters.learningFocus === "framework-specific");
  }, [filters.language, filters.learningFocus]);

  const handleLanguageChange = (value: string) => {
    setFilters({ 
      language: value,
      // Reset topics when language changes to avoid selecting unavailable topics
      topics: [],
      // Reset framework when language changes
      frameworkName: undefined
    });
  };

  const handleTopicChange = (topic: string, checked: boolean) => {
    setFilters({
      topics: checked
        ? [...filters.topics, topic]
        : filters.topics.filter(t => t !== topic)
    });
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    setFilters({
      difficulty: checked
        ? [...filters.difficulty, difficulty]
        : filters.difficulty.filter(d => d !== difficulty)
    });
  };

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setFilters({ numQuestions: value });
    }
  };
  
  const handleLearningFocusChange = (value: LearningFocus) => {
    setFilters({ 
      learningFocus: value,
      // Reset framework when focus changes
      frameworkName: undefined 
    });
  };
  
  const handleFrameworkChange = (value: string) => {
    setFilters({ frameworkName: value });
  };

  return (
    <div id="problem-generator" className="md:w-80 shrink-0">
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6">Generate Problems</h2>
          
          {/* Language Selector */}
          <div className="mb-6">
            <Label htmlFor="language" className="mb-2">
              Programming Language
            </Label>
            <Select 
              value={filters.language}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Topics */}
          <div className="mb-6">
            <Label className="mb-2">Topics</Label>
            <ScrollArea className="h-48 pr-4 rounded border p-2">
              <div className="space-y-2">
                {availableTopics.map(topic => (
                  <div key={topic} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`topic-${topic}`}
                      checked={filters.topics.includes(topic)}
                      onCheckedChange={(checked) => 
                        handleTopicChange(topic, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={`topic-${topic}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Difficulty */}
          <div className="mb-6">
            <Label className="mb-2">Difficulty</Label>
            <div className="space-y-2">
              {["easy", "medium", "hard"].map(difficulty => (
                <div key={difficulty} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`difficulty-${difficulty}`}
                    checked={filters.difficulty.includes(difficulty)}
                    onCheckedChange={(checked) => 
                      handleDifficultyChange(difficulty, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`difficulty-${difficulty}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Learning Focus */}
          <div className="mb-6">
            <Label className="mb-2">Learning Focus</Label>
            <RadioGroup 
              value={filters.learningFocus} 
              onValueChange={(value) => handleLearningFocusChange(value as LearningFocus)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="data-structures-algorithms" id="focus-dsa" />
                <Label htmlFor="focus-dsa" className="font-normal cursor-pointer flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Data Structures & Algorithms</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="job-preparation" id="focus-job" />
                <Label htmlFor="focus-job" className="font-normal cursor-pointer flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Job Preparation</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic-learning" id="focus-basic" />
                <Label htmlFor="focus-basic" className="font-normal cursor-pointer flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span>Basic Learning</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="framework-specific" id="focus-framework" />
                <Label htmlFor="focus-framework" className="font-normal cursor-pointer flex items-center gap-2">
                  <BookMarked className="h-4 w-4" />
                  <span>Framework Specific</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Framework Selector (conditionally rendered) */}
          {showFrameworkSelector && (
            <div className="mb-6">
              <Label htmlFor="framework" className="mb-2">
                Framework
              </Label>
              <Select 
                value={filters.frameworkName}
                onValueChange={handleFrameworkChange}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  {availableFrameworks.map(framework => (
                    <SelectItem key={framework.value} value={framework.value}>
                      {framework.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Custom Instructions */}
          <div className="mb-6">
            <Label htmlFor="custom-instructions" className="mb-2">
              Custom Instructions (Optional)
            </Label>
            <Textarea 
              id="custom-instructions"
              value={filters.customInstructions}
              onChange={(e) => setFilters({ customInstructions: e.target.value })}
              placeholder="E.g., Include real-world examples or focus on specific concepts..."
              rows={3}
            />
          </div>
          
          {/* Number of Questions */}
          <div className="mb-6">
            <Label htmlFor="num-questions" className="mb-2">
              Number of Questions
            </Label>
            <Input 
              id="num-questions"
              type="number"
              value={filters.numQuestions}
              onChange={handleNumQuestionsChange}
              min={1}
              max={10}
            />
          </div>
          
          {/* Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full"
              onClick={generateProblems}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Generate Problems
                </>
              )}
            </Button>
            
            <Button 
              variant="secondary"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={surpriseMe}
              disabled={isLoading}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Surprise Me!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
