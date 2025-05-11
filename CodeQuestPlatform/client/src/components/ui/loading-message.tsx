import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface LoadingMessageProps {
  language: string;
}

const languageMessages: Record<string, string[]> = {
  python: [
    "Importing humor from future...",
    "Unindenting your challenge...",
    "Feeding the python...",
    "Hatching pythonic problems...",
    "No semicolons were harmed in the making of this challenge...",
  ],
  javascript: [
    "Fixing semicolons before showing your challenge...",
    "Promising to return with your challenge soon...",
    "await this.generateChallenge()...",
    "Converting undefined to a valid challenge...",
    "Debugging the callback hell just for you...",
  ],
  cpp: [
    "Avoiding segfaults while compiling brilliance...",
    "Allocating memory for your challenge...",
    "Compiling your future expertise...",
    "Linking against the standard programming library...",
    "Handling pointers to your next challenge...",
  ],
  java: [
    "Brewing your coffee while Java compiles...",
    "Instantiating your new challenge...",
    "Extending your programming knowledge...",
    "Implementing interface between you and code mastery...",
    "Just Another Verbose Algorithm incoming...",
  ],
  ruby: [
    "Polishing gems for your challenge...",
    "Crafting code with elegant simplicity...",
    "Yielding to your learning goals...",
    "Ruby is making your challenge shine...",
    "Metaprogramming your next learning experience...",
  ],
  go: [
    "Going, going, gone! Challenge coming soon...",
    "Concurrently preparing your challenge...",
    "No runtime exceptions here, just clean code coming up...",
    "Goroutines assembling your learning experience...",
    "Challenge compilation is lightning fast, just like Go...",
  ],
  rust: [
    "Safe, concurrent challenges coming your way...",
    "Borrowing knowledge to create your challenge...",
    "Ensuring memory safety in your learning journey...",
    "Rust never breaks... and neither will you after this challenge!",
    "Ownership of these concepts will be yours soon...",
  ],
  typescript: [
    "Strongly typing your next challenge...",
    "Inferring the perfect challenge type for you...",
    "Compiling to pure JavaScript excellence...",
    "Type checking your learning experience...",
    "Interfacing with your programming potential...",
  ],
};

export function LoadingMessage({ language }: LoadingMessageProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = languageMessages[language] || [
    "Generating your unique problems...",
    "Creating tailored challenges for you...",
    "Leveraging AI to craft perfect problems...",
    "Almost there with your coding challenges...",
    "Preparing your programming workout...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
      <p className="text-xl font-medium mb-3">{messages[messageIndex]}</p>
      <p className="text-muted-foreground">
        Creating unique problems just for you...
      </p>
    </div>
  );
}
