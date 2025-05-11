import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProblemContext } from "@/contexts/problem-context";

export function ProgressTracker() {
  const { progress } = useProblemContext();
  
  const progressPercentage = Math.round(
    (progress.dailyCompleted / progress.dailyTotal) * 100
  );
  
  // Generate weekly streak bars
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  // For this MVP, we'll simulate a streak that matches the streak count
  const streakBars = days.map((day, index) => {
    return {
      day,
      active: index < progress.streak
    };
  });

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">Today's progress</p>
            <Progress value={progressPercentage} className="h-2.5 mb-1" />
            <p className="text-sm">
              You've completed <span className="font-medium">{progress.dailyCompleted} of {progress.dailyTotal}</span> questions today!
            </p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">Weekly streak</p>
            <div className="flex gap-1 mt-1">
              {streakBars.map((bar, index) => (
                <div 
                  key={index}
                  className={`flex-1 h-8 rounded ${
                    bar.active 
                      ? 'bg-primary' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  title={bar.day}
                />
              ))}
            </div>
            <p className="text-sm mt-1">
              Keep going! You're on a <span className="font-medium">{progress.streak}-day streak</span>!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
