import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How CodeQuest Works</h2>
          <p className="text-lg text-muted-foreground">
            CodeQuest leverages AI to generate personalized coding challenges that match your skill level and learning goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Select Your Parameters</h3>
              <p className="text-muted-foreground">
                Choose your programming language, topics of interest, and difficulty level to customize your learning experience.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate Unique Problems</h3>
              <p className="text-muted-foreground">
                Our AI creates tailor-made coding challenges with increasing complexity to build your skills progressively.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn and Improve</h3>
              <p className="text-muted-foreground">
                Get progressive hints when you're stuck, and view detailed solutions with explanations when you need deeper understanding.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
