"use client";

import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { useWalletStore } from "@/lib/store/walletStore";
import { useRouter, usePathname } from "next/navigation";

export function WalletSync() {
    const { address, isConnected } = useAccount();
    const { data: balanceData } = useBalance({ address });
    const { setWallet, isAuthenticated, logout } = useWalletStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isConnected && address) {
            // Sync Wagmi state to Zustand Store
            setWallet({
                address: address,
                balance: balanceData ? balanceData.formatted : "0.00",
                network: "base", // Defaulting to base for now
            });

            // Auto-redirect if on login page and connected
            if (pathname === "/login" || pathname === "/verify") {
                router.push("/wallet");
            }
        } else if (!isConnected && isAuthenticated) {
            // If Wagmi disconnects, sync store
            logout();
            if (pathname.startsWith("/wallet")) {
                router.push("/login");
            }
        }
    }, [isConnected, address, balanceData, setWallet, isAuthenticated, logout, router, pathname]);

    return null;
}
