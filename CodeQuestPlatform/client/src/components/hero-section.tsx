import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, LightbulbIcon, BookOpenCheck, PenTool } from "lucide-react";

export function HeroSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "function generateCode() { return 'CodeQuest'; }";
  const [textIndex, setTextIndex] = useState(0);
  
  // Handle cursor animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          setIsCursorVisible(true);
        } else {
          setIsCursorVisible(false);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle typing animation
  useEffect(() => {
    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(prev => prev + fullText[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [textIndex, fullText]);

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
    <section 
      id="hero-section"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=2070&auto=format&fit=crop')", 
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      {/* Animated cursor */}
      {isCursorVisible && (
        <div 
          className="absolute w-6 h-6 rounded-full pointer-events-none z-10"
          style={{ 
            left: `${cursorPosition.x}px`, 
            top: `${cursorPosition.y}px`, 
            background: "radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(99,102,241,0) 70%)",
            boxShadow: "0 0 20px 10px rgba(99,102,241,0.3)",
            transform: "translate(-50%, -50%)"
          }}
        ></div>
      )}
      
      {/* Code fragments in background */}
      <div className="absolute top-1/4 right-10 text-indigo-300 opacity-20 font-mono text-xl transform rotate-12">
        while (learning) {`{`} improve(); {`}`}
      </div>
      <div className="absolute bottom-1/4 left-10 text-green-300 opacity-20 font-mono text-xl transform -rotate-6">
        if (practice) {`{`} success = true; {`}`}
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl">
          <div className="font-mono text-xs text-green-400 mb-2 bg-gray-900 bg-opacity-50 p-2 rounded-md inline-block">
            <span className="text-purple-400">const</span> <span className="text-blue-400">codeQuest</span> = <span className="text-yellow-400">{typedText}</span>
            <span className="animate-pulse ml-1">|</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Master <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600">Coding Skills</span> with AI-Generated Challenges
          </h1>
          
          <p className="text-xl mb-8 text-gray-200 max-w-2xl">
            Level up your programming journey with personalized practice problems that adapt to your learning style, preferred language, and skill level.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-500 bg-opacity-20 p-2 rounded-lg">
                <Code className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Real-time Code Execution</h3>
                <p className="text-gray-300 text-sm">Write, test, and optimize your solutions right in the browser</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 bg-opacity-20 p-2 rounded-lg">
                <LightbulbIcon className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Smart Suggestions</h3>
                <p className="text-gray-300 text-sm">Get AI-powered code optimization tips and hints</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-500 bg-opacity-20 p-2 rounded-lg">
                <BookOpenCheck className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Custom Learning Paths</h3>
                <p className="text-gray-300 text-sm">Focus on algorithms, job prep, or specific frameworks</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-rose-500 bg-opacity-20 p-2 rounded-lg">
                <PenTool className="h-6 w-6 text-rose-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Track Your Progress</h3>
                <p className="text-gray-300 text-sm">Build confidence with daily challenges and streak tracking</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl border-0 text-base font-semibold"
              onClick={scrollToGenerator}
            >
              Start Coding Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black transition-all text-base font-semibold"
              onClick={scrollToHowItWorks}
            >
              Learn More
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-10 bg-black bg-opacity-50 p-4 rounded-lg inline-flex items-center">
            <div className="flex -space-x-2 mr-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs text-white font-bold">JS</div>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-bold">PY</div>
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-xs text-white font-bold">C++</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-xs text-white font-bold">+5</div>
            </div>
            <span className="text-white font-medium">Supports multiple languages & frameworks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
