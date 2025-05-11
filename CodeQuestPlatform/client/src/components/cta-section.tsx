import { Button } from "@/components/ui/button";

export function CTASection() {
  const scrollToGenerator = () => {
    const generatorSection = document.getElementById("problem-generator");
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Start Your Coding Journey Today
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
          Begin generating custom practice problems tailored to your skill level and learning goals.
          No signup required to get started!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-white hover:bg-gray-100 text-primary shadow-lg hover:shadow-xl"
            onClick={scrollToGenerator}
          >
            Generate Your First Problem
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-transparent text-white border-2 border-white hover:bg-white/10"
            onClick={scrollToHowItWorks}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
