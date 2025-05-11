import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      <div className="flex items-center justify-between bg-neutral-900 px-4 py-2">
        <span className="text-xs text-neutral-400">{language}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={copyToClipboard}
          className="h-8 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800"
        >
          <Copy className="h-3.5 w-3.5 mr-1.5" />
          {copied ? "Copied!" : "Copy code"}
        </Button>
      </div>
      <pre className="bg-neutral-900 p-4 overflow-x-auto font-mono text-sm text-neutral-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
