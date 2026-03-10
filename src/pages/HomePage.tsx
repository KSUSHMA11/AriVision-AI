import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ScanLine, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-accent">
            <span className="font-mono text-sm font-bold text-accent-foreground">Av</span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">AriVision AI</span>
        </div>
        <Link to="/dashboard">
          <Button variant="default" size="sm">
            Enter Dashboard
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <motion.div
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Powered by Vision Transformer & Swin Transformer
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Plant Pathology
            <br />
            <span className="text-primary">Diagnostic Lab</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground leading-relaxed">
            Clinical-grade disease detection for your crops. Upload a leaf image,
            receive an instant AI diagnosis with treatment protocols.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 px-8">
                Start Diagnosis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="gap-2 px-8">
                How It Works
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            {
              icon: ScanLine,
              title: "ViT Analysis",
              desc: "Vision Transformer breaks your leaf image into patches for pixel-level classification.",
            },
            {
              icon: Zap,
              title: "Instant Results",
              desc: "Get disease identification, confidence scores, and treatment in seconds.",
            },
            {
              icon: Shield,
              title: "Treatment Plans",
              desc: "Actionable cure protocols, prevention methods, and ongoing care instructions.",
            },
          ].map((f) => (
            <div key={f.title} className="lab-card rounded-lg">
              <f.icon className="mb-3 h-5 w-5 text-accent" />
              <h3 className="font-display text-sm font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        AriVision AI · Plant Pathology Diagnostic Platform
      </footer>
    </div>
  );
};

export default HomePage;
