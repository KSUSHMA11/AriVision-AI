import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { loginUser, User } from "@/lib/auth";

interface GoogleLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (user: User) => void;
}

const mockAccounts = [
    {
        name: "K Sushma",
        email: "k.sushma@gmail.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ksushma&backgroundColor=153,75,45",
        role: "admin",
    },
    {
        name: "Demo User",
        email: "demo.user@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo&backgroundColor=65,105,225",
        role: "user",
    },
] as User[];

export default function GoogleLoginModal({ isOpen, onClose, onSuccess }: GoogleLoginModalProps) {
    const [loadingEmail, setLoadingEmail] = useState<string | null>(null);

    const handleLogin = (account: User) => {
        setLoadingEmail(account.email);
        setTimeout(() => {
            const dbUser = loginUser({
                id: Math.random().toString(36).substr(2, 9),
                name: account.name,
                email: account.email,
                avatar: account.avatar,
                role: account.role,
            });
            setLoadingEmail(null);
            onSuccess(dbUser);
        }, 1200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex flex-col items-center pt-8 pb-6 px-6 relative">
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Google G Logo */}
                            <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>

                            <h2 className="text-2xl font-medium text-gray-900 mb-1">Sign in</h2>
                            <p className="text-[15px] text-gray-600">to continue to AriVision AI</p>
                        </div>

                        {/* Account List */}
                        <div className="border-t border-gray-200">
                            {mockAccounts.map((account) => (
                                <button
                                    key={account.email}
                                    onClick={() => handleLogin(account)}
                                    disabled={loadingEmail !== null}
                                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-[#f8f9fa] border-b border-gray-100 transition-colors text-left"
                                >
                                    <div className="relative">
                                        <img src={account.avatar} alt={account.name} className="h-10 w-10 rounded-full border border-gray-200" />
                                        {loadingEmail === account.email && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
                                                <div className="h-5 w-5 border-2 border-[#1a73e8] border-r-transparent rounded-full animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-sm font-medium text-[#3c4043] truncate">{account.name}</p>
                                        <p className="text-[13px] text-[#5f6368] truncate">{account.email}</p>
                                    </div>
                                    {account.role === "admin" && (
                                        <span className="shrink-0 text-[10px] font-bold tracking-wider text-[#1a73e8] uppercase bg-[#e8f0fe] px-2 py-0.5 rounded">Admin</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-[#f8f9fa] border-t border-gray-200 text-center">
                            <p className="text-xs text-gray-500">
                                This is a mock Google Login for demonstration.
                                <br />No actual authentication is performed.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
