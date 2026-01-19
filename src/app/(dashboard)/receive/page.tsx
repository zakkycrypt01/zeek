"use client";

import { QrCode, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ReceivePage() {
    const address = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

    return (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white font-heading">Receive Assets</h1>
                <p className="text-muted-foreground">Scan QR code or copy address to deposit</p>
            </div>

            <div className="bg-[#1e1e42]/50 border border-white/5 rounded-2xl p-8 flex flex-col items-center space-y-8">
                <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="bg-white p-4 rounded-2xl relative">
                        {/* Placeholder QR */}
                        <div className="w-48 h-48 bg-gray-900 rounded-lg flex items-center justify-center text-white/20">
                            <QrCode className="w-24 h-24" />
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-2">
                    <Label className="text-center block text-muted-foreground">Your Ethereum Address</Label>
                    <div className="flex gap-2">
                        <Input readOnly value={address} className="bg-white/5 border-white/10 text-center font-mono text-sm h-12 rounded-xl text-muted-foreground" />
                        <Button size="icon" variant="outline" className="h-12 w-12 border-white/10 hover:bg-white/10 rounded-xl shrink-0">
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="text-center text-xs text-muted-foreground bg-amber-500/10 text-amber-500 px-4 py-2 rounded-lg border border-amber-500/20">
                    Only send ETH or ERC-20 tokens to this address. Sending other assets may result in permanent loss.
                </div>
            </div>
        </div>
    );
}
