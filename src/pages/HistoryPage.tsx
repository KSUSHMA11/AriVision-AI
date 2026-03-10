import { motion } from "framer-motion";
import { Clock, BarChart3 } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

const history = [
  { plant: "Tomato", disease: "Early Blight", conf: 96, date: "Mar 10, 2026" },
  { plant: "Potato", disease: "Late Blight", conf: 92, date: "Mar 9, 2026" },
  { plant: "Apple", disease: "Apple Scab", conf: 89, date: "Mar 7, 2026" },
  { plant: "Grape", disease: "Black Rot", conf: 94, date: "Mar 5, 2026" },
  { plant: "Corn", disease: "Northern Leaf Blight", conf: 91, date: "Mar 3, 2026" },
];

const HistoryPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <TopBar />
      <main className="flex-1 px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-display text-2xl font-bold mb-1">Scan History</h1>
          <p className="text-sm text-muted-foreground mb-6">Previous diagnostic results</p>

          <div className="space-y-2">
            {history.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
              >
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
                    {item.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
};

export default HistoryPage;
