"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

const tokens = [
    { symbol: "ETH", name: "Ethereum", balance: "4.23", price: "2,340.50", value: "9,900.32", change: "+4.12%", icon: "🔷" },
    { symbol: "USDC", name: "USD Coin", balance: "2,500.00", price: "1.00", value: "2,500.00", change: "+0.01%", icon: "💵" },
    { symbol: "OP", name: "Optimism", balance: "145.20", price: "3.45", value: "500.94", change: "-1.23%", icon: "🔴" },
];

export default function TokenList() {
    return (
        <div className="rounded-2xl bg-[#1e1e42]/50 border border-white/5 p-6 backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-white font-heading">Assets</h3>
                <span className="text-xs text-muted-foreground cursor-pointer hover:text-white">View All</span>
            </div>

            <div className="space-y-4 flex-1">
                {tokens.map((token) => (
                    <div key={token.symbol} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl shadow-inner border border-white/5">
                                {token.icon}
                            </div>
                            <div>
                                <div className="font-medium text-white">{token.name}</div>
                                <div className="text-xs text-muted-foreground">{token.balance} {token.symbol}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-medium text-white">${token.value}</div>
                            <div className={token.change.startsWith("+") ? "text-xs text-emerald-400" : "text-xs text-red-400"}>
                                {token.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
