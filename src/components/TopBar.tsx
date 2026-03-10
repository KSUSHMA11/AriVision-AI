import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-primary px-4 py-3">
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-accent">
          <span className="font-mono text-sm font-bold text-accent-foreground">Av</span>
        </div>
        <span className="font-display text-lg font-semibold tracking-tight text-primary-foreground">
          AriVision AI
        </span>
      </Link>
      <Link
        to="/"
        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Sign Out</span>
      </Link>
    </header>
  );
};

export default TopBar;
