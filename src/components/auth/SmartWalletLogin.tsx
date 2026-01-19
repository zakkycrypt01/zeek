"use client";

import { useState } from "react";
import { useConnect } from "wagmi";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SmartWalletLogin() {
    const { connectors, connect, isPending } = useConnect();

    const handleLogin = () => {
        const coinbaseConnector = connectors.find(c => c.id === 'coinbaseWalletSDK');

        if (coinbaseConnector) {
            connect({ connector: coinbaseConnector });
        } else {
            toast.error("Coinbase Wallet SDK not found");
        }
    };

    return (
        <div className="w-full space-y-4">
            <Button
                onClick={handleLogin}
                disabled={isPending}
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.01]"
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Connecting...
                    </>
                ) : (
                    <>
                        Create Wallet / Log In
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
                Powered by Coinbase Smart Wallet. Passkeys supported.
            </p>
        </div>
    );
}
