import { HeroSection } from "@/components/hero-section";
import { DailyChallenge } from "@/components/daily-challenge";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { Features } from "@/components/features";
import { Roadmap } from "@/components/roadmap";
import { CTASection } from "@/components/cta-section";
import { ProblemGenerator } from "@/components/problem-generator";
import { ProgressTracker } from "@/components/progress-tracker";
import { QuickTip } from "@/components/quick-tip";
import { ProblemCard } from "@/components/problem-card";
import { LoadingMessage } from "@/components/ui/loading-message";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { useProblemContext } from "@/contexts/problem-context";

export function LandingPage() {
  const { problems, isLoading, generateProblems, filters } = useProblemContext();

  return (
    <div>
      <HeroSection />
      <DailyChallenge />
      
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <ProblemGenerator />
            
            <div className="flex-1">
              <ProgressTracker />

              {/* Loading State */}
              {isLoading && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-6">
                  <LoadingMessage language={filters.language} />
                </div>
              )}

              {/* Problem List */}
              {!isLoading && problems.length > 0 && (
                <div className="space-y-6">
                  {problems.map((problem, index) => (
                    <ProblemCard key={problem.id} problem={problem} index={index} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && problems.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md text-center">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No problems generated yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Use the filters to generate personalized coding challenges tailored to your learning goals.
                  </p>
                  <Button onClick={generateProblems}>
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Generate Sample Problems
                  </Button>
                </div>
              )}
              
              <QuickTip />
            </div>
          </div>
        </div>
      </section>
      
      <HowItWorks />
      <Testimonials />
      <Features />
      <Roadmap />
      <CTASection />
    </div>
  );
}
