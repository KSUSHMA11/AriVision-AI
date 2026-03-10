import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Upload, Clock, BarChart3 } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <TopBar />

      <main className="flex-1 px-4 py-6">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl font-bold">Diagnostic Lab</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload or capture a leaf for analysis</p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mb-8 grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="data-grid-cell rounded-lg">
            <p className="text-xs text-muted-foreground">Total Scans</p>
            <p className="font-mono text-2xl font-semibold mt-1">12</p>
          </div>
          <div className="data-grid-cell rounded-lg">
            <p className="text-xs text-muted-foreground">Diseases Found</p>
            <p className="font-mono text-2xl font-semibold mt-1">8</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8 grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/scan"
            className="flex flex-col items-center gap-3 rounded-lg bg-primary p-6 text-primary-foreground transition-transform active:scale-[0.98]"
          >
            <Camera className="h-8 w-8" />
            <span className="font-display text-sm font-semibold">Capture</span>
          </Link>
          <Link
            to="/scan"
            className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 transition-transform active:scale-[0.98]"
          >
            <Upload className="h-8 w-8 text-accent" />
            <span className="font-display text-sm font-semibold">Upload</span>
          </Link>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Recent Scans
          </h2>
          <div className="space-y-2">
            {[
              { plant: "Tomato", disease: "Early Blight", conf: 96, time: "2 hrs ago" },
              { plant: "Potato", disease: "Late Blight", conf: 92, time: "1 day ago" },
              { plant: "Apple", disease: "Apple Scab", conf: 89, time: "3 days ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-secondary">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.plant}</p>
                    <p className="text-xs text-muted-foreground">{item.disease}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold">{item.conf}%</p>
                  <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Large scan CTA at bottom */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2">
        <Link to="/scan">
          <motion.div
            className="capture-zone flex items-center justify-center gap-2 rounded-full border border-primary/20 py-4 text-center"
            whileTap={{ scale: 0.98 }}
          >
            <Camera className="h-5 w-5 text-primary" />
            <span className="font-display text-sm font-semibold text-primary">Scan New Leaf</span>
          </motion.div>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
