import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { getRandomTip } from "@/lib/tips";
import { useProblemContext } from "@/contexts/problem-context";

export function QuickTip() {
  const { filters } = useProblemContext();
  const [tip, setTip] = useState("");
  
  // Update tip when language changes
  useEffect(() => {
    setTip(getRandomTip(filters.language));
  }, [filters.language]);
  
  // Periodically change the tip (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setTip(getRandomTip(filters.language));
    }, 30000);
    
    return () => clearInterval(interval);
  }, [filters.language]);

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="shrink-0 mr-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Info className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Quick Tip</h3>
            <p className="text-gray-700 dark:text-gray-300">{tip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
