import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Code, CheckCircle, AlertCircle, Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CodeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  problemTitle: string;
  problemDescription: string;
  language: string;
  initialCode?: string;
  solutionCode?: string;
}

export function CodeEditor({
  isOpen,
  onClose,
  problemTitle,
  problemDescription,
  language,
  initialCode = "",
  solutionCode
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<{
    isSuccess?: boolean;
    output?: string;
    error?: string;
    feedback?: string;
  }>({});
  const [optimizationFeedback, setOptimizationFeedback] = useState<string>("");
  const [optimizedCode, setOptimizedCode] = useState<string>("");

  // Submit code for validation
  const handleRunCode = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty Code",
        description: "Please write some code before running.",
        variant: "destructive"
      });
      return;
    }
    
    setIsRunning(true);
    setResult({});
    
    try {
      const response = await fetch("/api/code/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problemTitle,
          problemDescription,
          solutionCode
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to validate code");
      }
      
      const data = await response.json();
      setResult({
        isSuccess: data.isValid,
        output: data.output,
        error: data.error,
        feedback: data.feedback
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "We're experiencing some technical difficulties. Please try again later.",
        variant: "destructive"
      });
      console.error("Code validation error:", error);
      
      // Set user-friendly error state
      setResult({
        isSuccess: false,
        feedback: "Our code validation service is temporarily unavailable. Please try again later."
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Get optimization suggestions
  const handleOptimize = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty Code",
        description: "Please write some code before optimizing.",
        variant: "destructive"
      });
      return;
    }
    
    setIsOptimizing(true);
    setOptimizedCode("");
    
    try {
      const response = await fetch("/api/code/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problemTitle,
          problemDescription
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to optimize code");
      }
      
      const data = await response.json();
      setOptimizationFeedback(data.optimizationFeedback);
      
      // Extract code snippets from the feedback
      if (data.optimizationFeedback) {
        // Look for code blocks surrounded by triple backticks
        const codeBlockMatch = data.optimizationFeedback.match(/```[\w]*\n([\s\S]*?)```/);
        if (codeBlockMatch && codeBlockMatch[1]) {
          setOptimizedCode(codeBlockMatch[1].trim());
        }
        
        // If no code blocks found, try to extract code from any Python style def or function declarations
        if (!codeBlockMatch) {
          if (language === 'python' && data.optimizationFeedback.includes('def ')) {
            const pythonFunctionMatch = data.optimizationFeedback.match(/def\s+[\w_]+\([^)]*\)[\s\S]*?(?=\n\n|$)/);
            if (pythonFunctionMatch) {
              setOptimizedCode(pythonFunctionMatch[0].trim());
            }
          } else if (language === 'javascript' && data.optimizationFeedback.includes('function ')) {
            const jsFunctionMatch = data.optimizationFeedback.match(/function\s+[\w_]+\([^)]*\)\s*\{[\s\S]*?\}/);
            if (jsFunctionMatch) {
              setOptimizedCode(jsFunctionMatch[0].trim());
            }
          }
        }
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "We're experiencing some technical difficulties with the optimization service. Please try again later.",
        variant: "destructive"
      });
      console.error("Code optimization error:", error);
      setOptimizationFeedback("Our code optimization service is temporarily unavailable. Please try again later.");
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isRunning && !isOptimizing && onClose()}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">{problemTitle} - Code Editor</DialogTitle>
          <DialogDescription>
            Write your solution and run it to check if it works correctly
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col flex-grow overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            {/* Code Editor Section */}
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <Code className="mr-2 h-5 w-5" />
                <h3 className="font-semibold">Your Code ({language})</h3>
              </div>
              <div className="relative flex-grow min-h-[300px] mb-4">
                <Textarea
                  className="font-mono text-sm p-4 resize-none overflow-auto h-full min-h-[300px] w-full bg-black text-green-400"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`Write your ${language} code here...`}
                />
              </div>
              
              {/* Optimized Code Section (conditionally shown) */}
              {optimizedCode && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
                    <h3 className="font-semibold">Optimized Code</h3>
                  </div>
                  <div className="h-[150px] overflow-auto border border-green-400 rounded-md">
                    <pre className="font-mono text-sm p-4 bg-black text-green-400 h-full">
                      {optimizedCode}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            
            {/* Results Section */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center">
                  {result.isSuccess === true && <CheckCircle className="mr-2 h-5 w-5 text-green-500" />}
                  {result.isSuccess === false && <AlertCircle className="mr-2 h-5 w-5 text-red-500" />}
                  Results & Feedback
                </h3>
              </div>
              
              <div className="border rounded-md p-4 overflow-auto max-h-[500px] mb-4">
                {isRunning ? (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p>Running your code...</p>
                  </div>
                ) : isOptimizing ? (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p>Analyzing your code for optimizations...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {result.isSuccess !== undefined && (
                      <div className={`p-3 rounded-md ${result.isSuccess ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
                        <p className="font-semibold">
                          {result.isSuccess ? 'Code successfully executed! 🎉' : 'Code execution failed. Check the details below.'}
                        </p>
                      </div>
                    )}
                    
                    {result.output && (
                      <div>
                        <h4 className="font-medium mb-1 flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Output:
                        </h4>
                        <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm overflow-auto max-h-[150px] whitespace-pre-wrap">{result.output}</pre>
                      </div>
                    )}
                    
                    {result.error && (
                      <div>
                        <h4 className="font-medium mb-1 text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Error:
                        </h4>
                        <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm overflow-auto max-h-[150px] whitespace-pre-wrap text-red-500">{result.error}</pre>
                      </div>
                    )}
                    
                    {result.feedback && (
                      <div>
                        <h4 className="font-medium mb-1 flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                          Feedback:
                        </h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm max-h-[200px] overflow-auto">{result.feedback}</div>
                      </div>
                    )}
                    
                    {optimizationFeedback && (
                      <div>
                        <h4 className="font-medium mb-1 flex items-center">
                          <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
                          Optimization Suggestions:
                        </h4>
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 p-3 rounded text-sm overflow-auto prose prose-sm max-w-none">
                          {optimizationFeedback.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .split(/```[\w]*\n|```/).map((part, i) => {
                              if (i % 2 === 0) {
                                // Text part - split paragraphs and render with proper formatting
                                return part.split('\n').map((paragraph, idx) => {
                                  if (paragraph.trim().startsWith('**')) {
                                    return <h5 key={idx} className="font-bold text-yellow-800 dark:text-yellow-400 mt-3 mb-1" dangerouslySetInnerHTML={{__html: paragraph}} />;
                                  }
                                  return paragraph.trim() ? <p key={idx} className="mb-2" dangerouslySetInnerHTML={{__html: paragraph}} /> : null;
                                });
                              } else {
                                // Code part
                                return part.trim() ? (
                                  <pre key={i} className="bg-gray-800 text-gray-100 p-2 rounded font-mono text-xs my-2 overflow-auto">
                                    {part.trim()}
                                  </pre>
                                ) : null;
                              }
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isRunning || isOptimizing}>
              Close
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              onClick={handleOptimize} 
              disabled={isRunning || isOptimizing || !code.trim()}
              className="gap-2"
            >
              {isOptimizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Optimize Code
            </Button>
            <Button 
              onClick={handleRunCode} 
              disabled={isRunning || isOptimizing || !code.trim()}
              className="gap-2"
            >
              {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
              Run Code
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}