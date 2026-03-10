import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ScanAnimationProps {
  isScanning: boolean;
  imageSrc: string | null;
  onComplete: () => void;
}

const STAGES = [
  {
    label: "ViT · Vision Transformer",
    sub: "Patch tokenization · Positional encoding · Self-attention",
    color: "hsl(255 100% 69%)",
    gridColor: "hsl(255 100% 69% / 0.25)",
    gridSize: "32px 32px",
  },
  {
    label: "Swin Transformer",
    sub: "Hierarchical feature extraction · Shifted-window attention",
    color: "hsl(153 75% 45%)",
    gridColor: "hsl(153 75% 45% / 0.25)",
    gridSize: "48px 48px",
  },
  {
    label: "Ensemble Classifier",
    sub: "Fusing ViT + Swin predictions · Confidence scoring",
    color: "hsl(38 95% 65%)",
    gridColor: "hsl(38 95% 65% / 0.18)",
    gridSize: "24px 24px",
  },
];

const ScanAnimation = ({ isScanning, imageSrc, onComplete }: ScanAnimationProps) => {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (!isScanning) {
      setStageIndex(0);
      return;
    }

    // Advance through all 3 stages
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStageIndex(1), 1500));
    timers.push(setTimeout(() => setStageIndex(2), 3000));
    timers.push(setTimeout(() => onComplete(), 4600));

    return () => timers.forEach(clearTimeout);
  }, [isScanning, onComplete]);

  const stage = STAGES[stageIndex];

  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: "hsl(240 10% 5%)" }}
        >
          <div className="relative w-full max-w-sm mx-4">
            {/* Image container */}
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Scanning leaf"
                  className="w-full object-cover"
                  style={{ maxHeight: "55vh" }}
                />
              )}

              {/* Dynamic grid overlay - changes per stage */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={stageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    backgroundImage: `linear-gradient(${stage.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${stage.gridColor} 1px, transparent 1px)`,
                    backgroundSize: stage.gridSize,
                  }}
                />
              </AnimatePresence>

              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-0.5"
                style={{
                  background: `linear-gradient(90deg, transparent, ${stage.color}, transparent)`,
                  boxShadow: `0 0 12px 4px ${stage.color}`,
                }}
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "100%", "0%", "100%"] }}
                transition={{
                  duration: 4.6,
                  times: [0, 0.35, 0.6, 1],
                  ease: "easeInOut",
                }}
              />

              {/* Corner brackets */}
              {["tl", "tr", "bl", "br"].map((corner) => (
                <div
                  key={corner}
                  className="absolute w-5 h-5"
                  style={{
                    top: corner.startsWith("t") ? 8 : undefined,
                    bottom: corner.startsWith("b") ? 8 : undefined,
                    left: corner.endsWith("l") ? 8 : undefined,
                    right: corner.endsWith("r") ? 8 : undefined,
                    borderTop: corner.startsWith("t") ? `2px solid ${stage.color}` : "none",
                    borderBottom: corner.startsWith("b") ? `2px solid ${stage.color}` : "none",
                    borderLeft: corner.endsWith("l") ? `2px solid ${stage.color}` : "none",
                    borderRight: corner.endsWith("r") ? `2px solid ${stage.color}` : "none",
                  }}
                />
              ))}
            </div>

            {/* Stage progress pills */}
            <div className="flex justify-center gap-2 mt-5">
              {STAGES.map((s, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  animate={{
                    width: i === stageIndex ? 28 : 8,
                    backgroundColor:
                      i < stageIndex
                        ? "#4ade80"
                        : i === stageIndex
                          ? s.color
                          : "hsl(0 0% 30%)",
                  }}
                  style={{ height: 8 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Status text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={stageIndex}
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
              >
                <p
                  className="font-display text-sm font-semibold tracking-widest uppercase"
                  style={{ color: stage.color }}
                >
                  {stage.label}
                </p>
                <p className="font-mono text-[11px] mt-1.5" style={{ color: "hsl(240 5% 60%)" }}>
                  {stage.sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanAnimation;
