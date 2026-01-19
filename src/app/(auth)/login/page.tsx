"use client";

import Link from "next/link";
import { Fingerprint, Upload, Key, ShieldCheck } from "lucide-react";
import EmailForm from "@/components/auth/EmailForm";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Icon Badge */}
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative bg-card/50 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl">
                    <Fingerprint className="w-8 h-8 text-primary" />
                </div>
            </div>

            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
                    Welcome Back
                </h1>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Enter your email to receive a secure authentication code.
                </p>
            </div>

            <div className="w-full space-y-6">
                {/* Email Form */}
                <EmailForm />

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#1e1e42] px-2 text-muted-foreground tracking-widest font-medium">
                            Secure Options
                        </span>
                    </div>
                </div>

                {/* Option Buttons */}
                <div className="grid gap-3">
                    <Button
                        variant="outline"
                        className="h-12 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all justify-start px-4 text-muted-foreground hover:border-primary/50 group"
                    >
                        <Upload className="mr-3 h-4 w-4 group-hover:text-primary transition-colors" />
                        Import Wallet
                    </Button>
                    <Button
                        variant="outline"
                        className="h-12 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all justify-start px-4 text-muted-foreground hover:border-primary/50 group"
                    >
                        <Key className="mr-3 h-4 w-4 group-hover:text-primary transition-colors" />
                        Hardware Key
                    </Button>
                </div>

                {/* Footer Security Note */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 bg-black/20 py-3 rounded-lg border border-white/5">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>End-to-end encrypted session</span>
                </div>
            </div>

            <div className="text-center text-sm">
                <span className="text-muted-foreground">New to the platform? </span>
                <Link
                    href="#"
                    className="font-medium text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors"
                >
                    Create Account
                </Link>
            </div>
        </div>
    );
}
