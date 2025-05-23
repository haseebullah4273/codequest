import { Navbar } from "@/components/navbar";
import { LandingPage } from "@/components/landing-page";
import { Footer } from "@/components/footer";
import { FeedbackButton } from "@/components/feedback-button";
import { Helmet } from "react-helmet";
import { ProblemProvider } from "@/contexts/problem-context";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CodeQuest - AI-Generated Coding Challenges for Beginners</title>
        <meta name="description" content="Learn to code with AI-generated practice problems tailored to your skill level, preferred language, and learning goals. Perfect for beginner programmers." />
        <meta property="og:title" content="CodeQuest - AI-Generated Coding Challenges for Beginners" />
        <meta property="og:description" content="Build coding skills with personalized practice problems generated by AI. Choose your language, topics, and difficulty level." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codequest.app" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <ProblemProvider>
            <LandingPage />
          </ProblemProvider>
        </main>
        <Footer />
        <FeedbackButton />
      </div>
    </>
  );
}
