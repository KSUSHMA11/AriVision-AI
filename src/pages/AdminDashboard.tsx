import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, MessageSquareText, Shield, User as UserIcon, Calendar, ArrowLeft } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { getAllUsers, getCurrentUser, User } from "@/lib/auth";
import { getFeedbacks, FeedbackEntry } from "@/lib/feedback";
import FallingLeaves from "@/components/FallingLeaves";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
    const [activeTab, setActiveTab] = useState<"users" | "feedbacks">("users");

    useEffect(() => {
        const me = getCurrentUser();
        if (!me || me.role !== "admin") {
            navigate("/"); // Redirect non-admins to home
            return;
        }
        setUsers(getAllUsers());
        setFeedbacks(getFeedbacks());
    }, [navigate]);

    return (
        <div className="flex min-h-screen flex-col bg-background pb-20 relative">
            <FallingLeaves />
            <TopBar />

            <main className="flex-1 px-4 py-6 relative z-10">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="font-display text-2xl font-bold">Admin Console</h1>
                            <p className="mt-1 text-sm text-muted-foreground">Manage users and view diagnostic feedback</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-6 grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`flex flex-col rounded-xl border p-4 transition-all ${activeTab === "users" ? "border-primary bg-primary/10" : "border-border bg-card/80 backdrop-blur-sm"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Users className={`h-4 w-4 ${activeTab === "users" ? "text-primary" : "text-muted-foreground"}`} />
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">App Users</span>
                            </div>
                            <span className="font-mono text-3xl font-bold">{users.length}</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("feedbacks")}
                            className={`flex flex-col rounded-xl border p-4 transition-all ${activeTab === "feedbacks" ? "border-primary bg-primary/10" : "border-border bg-card/80 backdrop-blur-sm"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquareText className={`h-4 w-4 ${activeTab === "feedbacks" ? "text-primary" : "text-muted-foreground"}`} />
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Feedbacks</span>
                            </div>
                            <span className="font-mono text-3xl font-bold">{feedbacks.length}</span>
                        </button>
                    </div>

                    {/* Users List */}
                    {activeTab === "users" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                            {users.map((u, i) => (
                                <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <img src={u.avatar} alt={u.name} className="h-10 w-10 shrink-0 rounded-full border border-border" />
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-semibold truncate leading-none mb-1">{u.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${u.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {u.role}
                                        </span>
                                        <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(u.lastLogin).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {users.length === 0 && (
                                <div className="text-center p-8 border border-dashed rounded-xl border-border text-muted-foreground text-sm">
                                    No users have logged in yet.
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Feedbacks List */}
                    {activeTab === "feedbacks" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            {feedbacks.map((fb) => (
                                <div key={fb.id} className="rounded-xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
                                    <div className={`px-4 py-2 flex items-center justify-between border-b ${fb.isAccurate ? 'bg-primary/10 border-primary/20' : 'bg-destructive/10 border-destructive/20'
                                        }`}>
                                        <span className={`text-[11px] font-bold uppercase tracking-wider ${fb.isAccurate ? 'text-primary' : 'text-destructive'
                                            }`}>
                                            {fb.isAccurate ? '✓ Accurate' : '✗ Inaccurate'}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground">{new Date(fb.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">User</p>
                                                <p className="font-medium truncate">{fb.userName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Target</p>
                                                <p className="font-medium truncate">{fb.plantName} / {fb.diseaseName}</p>
                                            </div>
                                        </div>
                                        {fb.comment && (
                                            <div className="rounded-lg bg-black/5 dark:bg-white/5 p-3 text-sm">
                                                "{fb.comment}"
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {feedbacks.length === 0 && (
                                <div className="text-center p-8 border border-dashed rounded-xl border-border text-muted-foreground text-sm">
                                    No feedback has been submitted yet.
                                </div>
                            )}
                        </motion.div>
                    )}

                </motion.div>
            </main>

            <BottomNav />
        </div>
    );
};

export default AdminDashboard;
