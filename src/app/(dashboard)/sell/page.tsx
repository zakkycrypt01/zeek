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
            <div>
                <h1 className="text-3xl font-bold text-white font-heading">Sell to Fiat</h1>
                <p className="text-muted-foreground">Convert crypto to cash and withdraw to your bank</p>
            </div>

            <div className="bg-[#1e1e42]/50 border border-white/5 rounded-2xl p-6 space-y-6">

                {/* Sell Input */}
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase">You Sell</Label>
                        <div className="flex gap-4 items-center">
                            <Input placeholder="0.00" className="text-2xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/30" />
                            <Select defaultValue="eth">
                                <SelectTrigger className="w-[120px] bg-white/10 border-none rounded-lg h-10">
                                    <SelectValue placeholder="Token" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="eth">ETH</SelectItem>
                                    <SelectItem value="usdc">USDC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="text-xs text-muted-foreground">Balance: 4.23 ETH</div>
                    </div>

                    <div className="flex justify-center -my-3 relative z-10">
                        <div className="bg-[#1e1e42] p-2 rounded-full border border-white/5">
                            <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                        </div>
                    </div>

                    {/* Receive Output */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase">You Receive</Label>
                        <div className="flex gap-4 items-center">
                            <div className="text-2xl font-bold text-white flex-1 truncate">$0.00</div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-sm font-medium">
                                <DollarSign className="w-4 h-4" /> USD
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <Label>Withdraw Destination</Label>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <Landmark className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium text-white">Chase Bank (...8832)</div>
                                <div className="text-xs text-muted-foreground">ACH Transfer • 1-3 Business Days</div>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">Change</Button>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rate</span>
                        <span className="text-white">1 ETH = $2,340.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Coinbase Fee</span>
                        <span className="text-white">Included</span>
                    </div>
                </div>

                <Button
                    className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20"
                    onClick={handleSell}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Confirm & Sell"}
                    {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
            </div>
        </div>
    );
}
