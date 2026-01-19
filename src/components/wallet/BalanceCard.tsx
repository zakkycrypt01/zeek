"use client";

import { ArrowUpRight, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BalanceCard() {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-[#282852] to-[#1e1e42] p-6 border border-white/5 relative overflow-hidden shadow-xl">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Total Balance</h2>
                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl md:text-5xl font-bold text-white font-heading">$12,450.23</span>
                    <span className="text-sm font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">+2.45% (24h)</span>
                </div>

                <div className="flex flex-wrap gap-4">
                    <Link href="/send">
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6 shadow-lg shadow-primary/20">
                            <Send className="w-4 h-4 mr-2" />
                            Send
                        </Button>
                    </Link>
                    <Link href="/receive">
                        <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white rounded-xl h-12 px-6">
                            <ArrowUpRight className="w-4 h-4 mr-2" />
                            Receive
                        </Button>
                    </Link>
                    <Link href="/sell">
                        <Button variant="secondary" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl h-12 px-6">
                            <Plus className="w-4 h-4 mr-2" />
                            Buy / Sell
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
