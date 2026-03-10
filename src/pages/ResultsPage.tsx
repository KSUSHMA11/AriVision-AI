import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ScanLine, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { DiagnosisResult } from "@/lib/mockDiagnosis";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as DiagnosisResult | undefined;
  const imageSrc = location.state?.imageSrc as string | undefined;

  const [feedback, setFeedback] = useState<"accurate" | "inaccurate" | null>(null);
  const [comment, setComment] = useState("");

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="text-muted-foreground mb-4">No diagnosis data found.</p>
        <Link to="/scan">
          <Button>Go to Scanner</Button>
        </Link>
      </div>
    );
  }

  const statusColor =
    result.status === "critical" ? "text-destructive" : result.status === "infected" ? "text-warning" : "text-primary";

  const submitFeedback = () => {
    toast.success("Feedback submitted. Thank you.");
    setFeedback(null);
    setComment("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <TopBar />

      <main className="flex-1 px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Back button */}
          <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {/* Scanned image */}
          {imageSrc && (
            <div className="mb-4 overflow-hidden rounded-lg border border-border">
              <img src={imageSrc} alt="Scanned leaf" className="w-full object-cover" style={{ maxHeight: "30vh" }} />
            </div>
          )}

          {/* Data grid 2×2 */}
          <div className="mb-6 grid grid-cols-2 gap-0 overflow-hidden rounded-lg border border-border">
            <div className="data-grid-cell border-b border-r">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Plant</p>
              <p className="font-display text-lg font-bold mt-1">{result.plant}</p>
            </div>
            <div className="data-grid-cell border-b">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Disease</p>
              <p className="font-display text-lg font-bold mt-1">{result.disease}</p>
            </div>
            <div className="data-grid-cell border-r">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence</p>
              <p className="font-mono text-2xl font-bold mt-1">{result.confidence}%</p>
            </div>
            <div className="data-grid-cell">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</p>
              <p className={`font-display text-lg font-bold mt-1 capitalize ${statusColor}`}>{result.status}</p>
            </div>
          </div>

          {/* Description */}
          <div className="lab-card mb-3 rounded-lg">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-sm leading-relaxed">{result.description}</p>
          </div>

          {/* Treatment */}
          <div className="lab-card mb-3 rounded-lg">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Cure / Treatment
            </h3>
            <p className="text-sm leading-relaxed">{result.cure}</p>
          </div>

          {/* Prevention */}
          <div className="lab-card mb-3 rounded-lg">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Prevention
            </h3>
            <p className="text-sm leading-relaxed">{result.prevention}</p>
          </div>

          {/* Care Tips */}
          <div className="lab-card mb-6 rounded-lg">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Plant Care Tips
            </h3>
            <p className="text-sm leading-relaxed">{result.careTips}</p>
          </div>

          {/* Feedback Section */}
          <div className="lab-card rounded-lg">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Was this diagnosis accurate?
            </h3>
            <div className="flex gap-3 mb-3">
              <button
                onClick={() => setFeedback("accurate")}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  feedback === "accurate" ? "border-primary bg-primary/10 text-primary" : "border-border"
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                Accurate
              </button>
              <button
                onClick={() => setFeedback("inaccurate")}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  feedback === "inaccurate" ? "border-destructive bg-destructive/10 text-destructive" : "border-border"
                }`}
              >
                <ThumbsDown className="h-4 w-4" />
                Inaccurate
              </button>
            </div>

            {feedback && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <Textarea
                  placeholder="Additional comments (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-3"
                  rows={3}
                />
                <Button onClick={submitFeedback} size="sm">
                  Submit Feedback
                </Button>
              </motion.div>
            )}
          </div>

          {/* Scan Again */}
          <div className="mt-6">
            <Link to="/scan">
              <Button variant="outline" className="w-full gap-2">
                <ScanLine className="h-4 w-4" />
                Scan Another Leaf
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ResultsPage;
