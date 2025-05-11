import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

export function Roadmap() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Roadmap</h2>
          <p className="text-lg text-muted-foreground">
            CodeQuest is constantly evolving. Here's what we're working on to make your learning experience even better.
          </p>
        </div>
        
        <div className="relative mx-auto max-w-4xl">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-primary/20 transform md:-translate-x-1/2"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {/* Item 1 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex md:w-1/2 md:justify-end mb-4 md:mb-0 md:pr-8">
                <Card className="max-w-sm">
                  <CardContent className="p-5">
                    <Badge className="bg-primary/10 text-primary mb-2">Now Available</Badge>
                    <h3 className="text-xl font-semibold mb-2">AI-Generated Challenges</h3>
                    <p className="text-muted-foreground">
                      Custom problem generation with hint system and detailed solutions across multiple languages.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute left-0 md:left-1/2 -ml-3 md:-ml-4 bg-primary rounded-full border-4 border-background dark:border-gray-900 w-8 h-8 transform md:-translate-x-1/2 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            {/* Item 2 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="md:w-1/2 md:pr-8"></div>
              <div className="absolute left-0 md:left-1/2 -ml-3 md:-ml-4 bg-primary rounded-full border-4 border-background dark:border-gray-900 w-8 h-8 transform md:-translate-x-1/2 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex md:w-1/2 md:justify-start mb-4 md:mb-0 md:pl-8">
                <Card className="max-w-sm">
                  <CardContent className="p-5">
                    <Badge className="bg-blue-500/10 text-blue-500 mb-2">Coming Soon</Badge>
                    <h3 className="text-xl font-semibold mb-2">Code Execution Environment</h3>
                    <p className="text-muted-foreground">
                      Test and run your solutions directly in the browser with real-time feedback and validation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex md:w-1/2 md:justify-end mb-4 md:mb-0 md:pr-8">
                <Card className="max-w-sm">
                  <CardContent className="p-5">
                    <Badge className="bg-blue-500/10 text-blue-500 mb-2">Coming Soon</Badge>
                    <h3 className="text-xl font-semibold mb-2">User Accounts & Progress Tracking</h3>
                    <p className="text-muted-foreground">
                      Save your progress across devices, track your learning journey, and earn achievements.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute left-0 md:left-1/2 -ml-3 md:-ml-4 bg-gray-300 dark:bg-gray-600 rounded-full border-4 border-background dark:border-gray-900 w-8 h-8 transform md:-translate-x-1/2"></div>
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            {/* Item 4 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="md:w-1/2 md:pr-8"></div>
              <div className="absolute left-0 md:left-1/2 -ml-3 md:-ml-4 bg-gray-300 dark:bg-gray-600 rounded-full border-4 border-background dark:border-gray-900 w-8 h-8 transform md:-translate-x-1/2"></div>
              <div className="flex md:w-1/2 md:justify-start mb-4 md:mb-0 md:pl-8">
                <Card className="max-w-sm">
                  <CardContent className="p-5">
                    <Badge className="bg-blue-500/10 text-blue-500 mb-2">Future Release</Badge>
                    <h3 className="text-xl font-semibold mb-2">Learning Paths & Courses</h3>
                    <p className="text-muted-foreground">
                      Structured learning journeys with curated problem sequences to master specific programming concepts.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
