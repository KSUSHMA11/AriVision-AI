import { motion } from "framer-motion";
import { Cpu, Eye, Layers, GitBranch } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

const AboutPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <TopBar />
      <main className="flex-1 px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold mb-1">About AriVision AI</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Clinical-grade plant pathology diagnostics powered by transformer neural networks.
          </p>

          <div className="space-y-4">
            <div className="lab-card rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="h-5 w-5 text-accent" />
                <h3 className="font-display text-sm font-semibold">Vision Transformer (ViT)</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Splits leaf images into fixed-size patches, linearly embeds each, and processes them through a standard Transformer encoder.
                This enables the model to capture both local lesion patterns and global leaf morphology.
              </p>
            </div>

            <div className="lab-card rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="h-5 w-5 text-accent" />
                <h3 className="font-display text-sm font-semibold">Swin Transformer</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Uses shifted windows to compute self-attention within local regions, then merges patches hierarchically.
                This produces multi-scale feature maps ideal for detecting diseases at varying scales and stages.
              </p>
            </div>

            <div className="lab-card rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="h-5 w-5 text-accent" />
                <h3 className="font-display text-sm font-semibold">Ensemble Classification</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Both models run inference in parallel. Their probability distributions are averaged to produce a final classification
                with higher accuracy and robustness than either model alone.
              </p>
            </div>

            <div className="lab-card rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <GitBranch className="h-5 w-5 text-accent" />
                <h3 className="font-display text-sm font-semibold">Dataset</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trained on the PlantVillage dataset containing 54,000+ images across 38 disease classes covering 14 crop species.
                Augmentation techniques including rotation, flipping, and color jitter improve generalization.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-border p-4 text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Built for the field
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              High-contrast UI designed for outdoor visibility. Thumb-driven navigation for one-handed use.
            </p>
          </div>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
};

export default AboutPage;
