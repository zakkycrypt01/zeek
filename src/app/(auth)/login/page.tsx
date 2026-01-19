"use client";

import Link from "next/link";
import SmartWalletLogin from "@/components/auth/SmartWalletLogin";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <div className="space-y-6 text-center animate-in fade-in-50 duration-500">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white font-heading">Welcome Back</h1>
                <p className="text-muted-foreground">Access your crypto portfolio securely</p>
            </div>

            <div className="glass-card rounded-2xl p-8 space-y-6">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/20 animate-pulse">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                            <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
                            <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                </div>

                <SmartWalletLogin />

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#1e1e42] px-2 text-muted-foreground">Or</span>
                    </div>
                </div>

                <Link href="/import" className="block">
                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/10 hover:text-white rounded-xl h-12">
                        Use Hardware Wallet
                    </Button>
                </Link>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
                By connecting, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    );
}
