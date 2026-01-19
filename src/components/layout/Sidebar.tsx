"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Wallet,
    ArrowRightLeft,
    History,
    Settings,
    LogOut,
    CreditCard,
    Send,
    QrCode
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/lib/store/walletStore";
import { useRouter } from "next/navigation";

const navItems = [
    { href: "/wallet", label: "Dashboard", icon: Wallet },
    { href: "/send", label: "Send", icon: Send },
    { href: "/receive", label: "Receive", icon: QrCode },
    { href: "/sell", label: "Sell / Offramp", icon: CreditCard },
    { href: "/history", label: "History", icon: History },
    { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useWalletStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex flex-col h-full py-6 px-4 glass-panel border-r-0 rounded-r-2xl my-2 ml-2">
            {/* Brand */}
            <div className="flex items-center gap-3 px-2 mb-10">
                <div className="bg-primary/20 p-2 rounded-lg border border-primary/20">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>
                <span className="text-lg font-bold tracking-tight text-white font-heading">CRYPTOCORE</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-secondary-foreground shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className={cn("w-4 h-4", isActive ? "text-secondary-foreground" : "text-muted-foreground group-hover:text-white")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                <div className="px-3">
                    <div className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-muted-foreground font-medium mb-2">My Balance</p>
                        <p className="text-xl font-bold text-white mb-1">$12,450.23</p>
                        <div className="text-xs text-emerald-400 font-medium">+2.45%</div>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-red-400 hover:bg-red-500/10 gap-3 px-3"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
