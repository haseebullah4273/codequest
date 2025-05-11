import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function FeedbackButton() {
  const { toast } = useToast();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const submitFeedback = () => {
    if (feedbackText.trim() === "") {
      toast({
        title: "Empty Feedback",
        description: "Please enter some feedback before submitting.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send data to a server
    console.log("Feedback submitted:", feedbackText);

    // Clear feedback and close modal
    setFeedbackText("");
    setShowFeedbackModal(false);

    // Show success message
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input to help improve CodeQuest.",
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setShowFeedbackModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full h-12 w-12 p-0 shadow-lg transition-all hover:shadow-xl"
          aria-label="Send feedback"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>
            We'd love to hear your thoughts on CodeQuest! Your feedback helps us improve.
          </DialogDescription>
          
          <Textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Share your experience or suggestions..."
            rows={4}
            className="my-4"
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackModal(false)}>
              Cancel
            </Button>
            <Button onClick={submitFeedback}>
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
