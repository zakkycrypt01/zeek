"use client";

import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";
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

export default function SendPage() {
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        setLoading(true);
        // Mock simulation
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white font-heading">Send Assets</h1>
                <p className="text-muted-foreground">Transfer tokens to another wallet</p>
            </div>

            <div className="bg-[#1e1e42]/50 border border-white/5 rounded-2xl p-6 space-y-6">
                <div className="space-y-2">
                    <Label>Recipient Address</Label>
                    <Input placeholder="0x... or ENS name" className="h-12 bg-white/5 border-white/10 rounded-xl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Asset</Label>
                        <Select defaultValue="eth">
                            <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
                                <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                                <SelectItem value="usdc">USDC</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Amount</Label>
                        <div className="relative">
                            <Input placeholder="0.00" className="h-12 bg-white/5 border-white/10 rounded-xl pr-12" />
                            <Button variant="ghost" size="sm" className="absolute right-1 top-1.5 text-xs h-9">MAX</Button>
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Network Fee</span>
                        <span className="text-white">~ $0.45</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total</span>
                        <span className="font-bold text-white">$100.45</span>
                    </div>
                </div>

                <Button
                    className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 rounded-xl"
                    onClick={handleSend}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Continue"}
                    {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
            </div>
        </div>
    );
}
