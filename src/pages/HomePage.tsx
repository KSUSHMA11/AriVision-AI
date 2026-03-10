import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ScanLine, Shield, Zap, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import FallingLeaves from "@/components/FallingLeaves";
import GoogleLoginModal from "@/components/GoogleLoginModal";
import { getCurrentUser, User } from "@/lib/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleAuthSuccess = (u: User) => {
    setIsLoginModalOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <FallingLeaves />
      {/* Premium Header */}
      <header
        className="flex items-center justify-between px-6 relative z-10"
        style={{
          background: "linear-gradient(135deg, hsl(153 75% 12%) 0%, hsl(153 75% 20%) 50%, hsl(160 60% 25%) 100%)",
          boxShadow: "0 2px 24px 0 hsl(153 75% 12% / 0.35), 0 1px 0 hsl(153 75% 40% / 0.15) inset",
          minHeight: 64,
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 py-3">
          <motion.div
            whileHover={{ rotate: 20, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, hsl(255 100% 69%) 0%, hsl(280 100% 65%) 100%)",
              boxShadow: "0 0 16px hsl(255 100% 69% / 0.5)",
            }}
          >
            <Leaf className="h-5 w-5 text-white" strokeWidth={2.2} />
          </motion.div>
          <div className="flex flex-col leading-none">
            <span
              className="font-display text-[15px] font-bold tracking-tight text-white"
              style={{ letterSpacing: "-0.01em" }}
            >
              AriVision AI
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "hsl(153 60% 65%)" }}>
              Plant Pathology
            </span>
          </div>
        </div>

        {/* Enter Dashboard CTA */}
        {user ? (
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, hsl(255 100% 69% / 0.9) 0%, hsl(255 100% 60% / 0.9) 100%)",
                boxShadow: "0 0 18px hsl(255 100% 69% / 0.4), 0 2px 8px hsl(0 0% 0% / 0.25)",
                border: "1px solid hsl(255 100% 80% / 0.3)",
              }}
            >
              Enter Dashboard
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        ) : (
          <motion.button
            onClick={() => setIsLoginModalOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in
          </motion.button>
        )}
      </header>


      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 relative z-10">
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
      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground relative z-10">
        AriVision AI · Plant Pathology Diagnostic Platform
      </footer>

      <GoogleLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default HomePage;
