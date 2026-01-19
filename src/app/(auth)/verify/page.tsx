"use client";

import { ShieldCheck } from "lucide-react";
import OTPForm from "@/components/auth/OTPForm";

export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
          Verify Device
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          We've sent a 6-digit code to your email. Enter it below to secure your session.
        </p>
      </div>

      <div className="w-full space-y-6">
        <OTPForm />
      </div>

      {/* Footer Security Note */}
       <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 bg-black/20 py-3 rounded-lg border border-white/5 w-full">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Encrypted Verification</span>
        </div>
    </div>
  );
}
