import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Leaf, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { getCurrentUser, logoutUser, User } from "@/lib/auth";
import { useState } from "react";
import GoogleLoginModal from "./GoogleLoginModal";

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser();
    setUser(null);
    navigate("/");
  };

  const pageTitle: Record<string, string> = {
    "/dashboard": "Diagnostic Lab",
    "/scan": "Scan Leaf",
    "/results": "Results",
    "/history": "History",
    "/about": "About",
  };

  const title = pageTitle[location.pathname] ?? "AriVision AI";

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-4 py-0"
      style={{
        background: "linear-gradient(135deg, hsl(153 75% 12%) 0%, hsl(153 75% 20%) 50%, hsl(160 60% 25%) 100%)",
        boxShadow: "0 2px 24px 0 hsl(153 75% 12% / 0.35), 0 1px 0 hsl(153 75% 40% / 0.15) inset",
        minHeight: 64,
      }}
    >
      {/* Left — Logo */}
      <Link to="/dashboard" className="flex items-center gap-2.5 py-3 group">
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
      </Link>

      {/* Center — Page title pill */}
      {title !== "AriVision AI" && (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ background: "hsl(153 75% 40% / 0.18)", border: "1px solid hsl(153 60% 50% / 0.25)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "hsl(153 60% 65%)" }} />
          <span className="font-display text-xs font-semibold tracking-wide" style={{ color: "hsl(153 60% 80%)" }}>
            {title}
          </span>
        </motion.div>
      )}

      {/* Right — User Auth */}
      {user ? (
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex flex-col items-end leading-none">
            <span className="text-sm font-semibold text-white">{user.name}</span>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' ? 'text-[#ff9800]' : 'text-gray-400'
              }`}>
              {user.role}
            </span>
          </div>
          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full border border-white/20" />

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-xl px-2 py-2 text-xs font-medium transition-all duration-200 ml-1"
            style={{ color: "hsl(153 40% 75%)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "hsl(0 0% 100% / 0.08)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "hsl(153 40% 75%)";
            }}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline font-semibold">Exit</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-white transition-all duration-200"
          style={{ background: "hsl(0 0% 100% / 0.15)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "hsl(0 0% 100% / 0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "hsl(0 0% 100% / 0.15)";
          }}
        >
          <LogIn className="h-4 w-4" />
          Sign In
        </button>
      )}

      <GoogleLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(u) => {
          setUser(u);
          setIsLoginModalOpen(false);
          // Small delay then reload if they want to access protected routing (optional)
        }}
      />
    </header>
  );
};

export default TopBar;
