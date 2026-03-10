import { motion, AnimatePresence } from "framer-motion";

interface ScanAnimationProps {
  isScanning: boolean;
  imageSrc: string | null;
  onComplete: () => void;
}

const ScanAnimation = ({ isScanning, imageSrc, onComplete }: ScanAnimationProps) => {
  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: "hsl(240 10% 6%)" }}
        >
          <div className="relative w-full max-w-sm mx-4">
            {/* Image container */}
            <div className="relative overflow-hidden rounded-lg">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Scanning leaf"
                  className="w-full object-cover"
                  style={{ maxHeight: "60vh" }}
                />
              )}

              {/* Scan line */}
              <motion.div
                className="scan-line absolute left-0 right-0 h-1"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: 1,
                }}
                onAnimationComplete={onComplete}
              />

              {/* Grid overlay - transformer patches */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0.4, 0] }}
                transition={{ duration: 4, times: [0, 0.3, 0.7, 1] }}
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(255 100% 69% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(255 100% 69% / 0.3) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            {/* Status text */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="font-display text-sm font-medium tracking-widest uppercase text-accent">
                Analyzing Pathology
              </p>
              <p className="font-mono text-xs mt-2" style={{ color: "hsl(240 5% 65%)" }}>
                Vision Transformer · Patch Encoding · Classification
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanAnimation;
