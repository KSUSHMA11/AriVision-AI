import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Upload, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import ScanAnimation from "@/components/ScanAnimation";
import { getRandomDiagnosis } from "@/lib/mockDiagnosis";

const ScanPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const startScan = () => {
    if (!image) return;
    setIsScanning(true);
  };

  const onScanComplete = () => {
    const result = getRandomDiagnosis();
    setIsScanning(false);
    navigate("/results", { state: { result, imageSrc: image } });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <TopBar />
      <ScanAnimation isScanning={isScanning} imageSrc={image} onComplete={onScanComplete} />

      <main className="flex-1 px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-display text-2xl font-bold mb-1">Scan Leaf</h1>
          <p className="text-sm text-muted-foreground mb-6">Capture or upload a leaf image for diagnosis</p>

          {!image ? (
            <div className="space-y-3">
              {/* Camera capture */}
              <button
                onClick={() => cameraRef.current?.click()}
                className="flex w-full items-center gap-4 rounded-lg bg-primary p-5 text-primary-foreground transition-transform active:scale-[0.98]"
              >
                <Camera className="h-6 w-6" />
                <div className="text-left">
                  <p className="font-display text-sm font-semibold">Take Photo</p>
                  <p className="text-xs opacity-80">Use device camera</p>
                </div>
              </button>
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {/* File upload */}
              <button
                onClick={() => fileRef.current?.click()}
                className="flex w-full items-center gap-4 rounded-lg border border-border bg-card p-5 transition-transform active:scale-[0.98]"
              >
                <Upload className="h-6 w-6 text-accent" />
                <div className="text-left">
                  <p className="font-display text-sm font-semibold">Upload Image</p>
                  <p className="text-xs text-muted-foreground">Select from gallery</p>
                </div>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {/* Drop zone */}
              <div
                className="mt-4 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) handleFile(file);
                }}
              >
                <p className="text-xs text-muted-foreground">Or drag and drop an image here</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative overflow-hidden rounded-lg border border-border">
                <img src={image} alt="Leaf preview" className="w-full object-cover" style={{ maxHeight: "50vh" }} />
                <button
                  onClick={() => setImage(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/70 text-background"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Analyze button */}
              <Button onClick={startScan} size="lg" className="w-full gap-2">
                Analyze Pathology
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ScanPage;
