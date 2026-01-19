"use client";

import { useState } from "react";
import { Landmark, ArrowRight, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SellPage() {
    const [loading, setLoading] = useState(false);

    const handleSell = async () => {
        setLoading(true);
        // Mock simulation
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-heading mb-2">Sell to Fiat</h1>
                <p className="text-muted-foreground/80">Convert crypto to cash and withdraw to your bank instantly</p>
            </div>

            <div className="glass-card rounded-3xl p-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/5 opacity-50 pointer-events-none" />

                <div className="bg-[#151530]/80 backdrop-blur-xl rounded-[20px] p-6 space-y-6 relative z-10">

                    {/* Input Section */}
                    <div className="space-y-1">
                        <div className="p-5 rounded-2xl bg-black/20 border border-white/5 transition-colors hover:border-white/10 space-y-3">
                            <Label className="text-xs font-bold tracking-wider text-muted-foreground uppercase pl-1">You Sell</Label>
                            <div className="flex gap-4 items-center">
                                <Input placeholder="0.00" className="text-3xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/20 text-white" />
                                <Select defaultValue="eth">
                                    <SelectTrigger className="w-[140px] bg-white/5 border-white/10 rounded-xl h-12 text-white hover:bg-white/10 transition-colors shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">🔷</div>
                                            <SelectValue placeholder="Token" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="eth">Ethereum</SelectItem>
                                        <SelectItem value="usdc">USDC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-xs font-medium text-muted-foreground/60 pl-1">Balance: 4.23 ETH</div>
                        </div>

                        <div className="flex justify-center -my-5 relative z-20">
                            <div className="bg-[#1e1e42] p-2.5 rounded-full border-4 border-[#151530] shadow-xl">
                                <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-black/20 border border-white/5 transition-colors hover:border-white/10 space-y-3 pt-6">
                            <Label className="text-xs font-bold tracking-wider text-muted-foreground uppercase pl-1">You Receive</Label>
                            <div className="flex gap-4 items-center">
                                <div className="text-3xl font-bold text-white flex-1 truncate">$0.00</div>
                                <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                    <DollarSign className="w-4 h-4 text-emerald-400" />
                                    <span className="font-semibold text-emerald-100">USD</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <Label className="pl-1 text-sm text-muted-foreground">Withdraw Destination</Label>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 hover:border-blue-500/40 cursor-pointer transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                                    <Landmark className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-semibold text-white group-hover:text-blue-100 transition-colors">Chase Bank (...8832)</div>
                                    <div className="text-xs text-blue-200/60 font-medium mt-0.5">ACH Transfer • 1-3 Business Days</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">Change</Button>
                        </div>
                    </div>

                    <div className="px-2 py-3 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Exchange Rate</span>
                            <span className="text-white font-medium">1 ETH ≈ $2,340.50</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Network Fee</span>
                            <span className="text-emerald-400 font-medium">No Fee</span>
                        </div>
                    </div>

                    <Button
                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 border-t border-white/20 transition-all transform hover:scale-[1.01]"
                        onClick={handleSell}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Confirm & Sell"}
                        {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
                    </Button>
                </div>
            </div>

            <p className="text-center text-xs text-muted-foreground/50">
                Securely processed by Coinbase Protocol
            </p>
        </div>
    );
}
