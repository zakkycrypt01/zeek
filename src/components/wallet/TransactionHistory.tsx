"use client";

import { ArrowUpRight, ArrowDownLeft, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const transactions = [
    { id: 1, type: "receive", asset: "USDC", amount: "500.00", from: "0x742...3f4", date: "Today, 10:23 AM", status: "completed" },
    { id: 2, type: "send", asset: "ETH", amount: "0.45", to: "coinbase.eth", date: "Yesterday", status: "completed" },
    { id: 3, type: "swap", asset: "ETH -> USDC", amount: "0.1", date: "Jan 12, 2026", status: "pending" },
    { id: 4, type: "offramp", asset: "USDC -> USD", amount: "1000.00", date: "Jan 10, 2026", status: "completed" },
];

export default function TransactionHistory() {
    return (
        <div className="rounded-2xl bg-[#1e1e42]/30 border border-white/5 p-6">
            <h3 className="font-semibold text-lg text-white mb-6 font-heading">Recent Activity</h3>

            <div className="space-y-4">
                {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/5 ${tx.type === 'receive' ? 'bg-emerald-500/10 text-emerald-400' :
                                    tx.type === 'send' ? 'bg-blue-500/10 text-blue-400' :
                                        'bg-purple-500/10 text-purple-400'
                                }`}>
                                {tx.type === 'receive' && <ArrowDownLeft className="w-5 h-5" />}
                                {tx.type === 'send' && <ArrowUpRight className="w-5 h-5" />}
                                {(tx.type === 'swap' || tx.type === 'offramp') && <RefreshCcw className="w-5 h-5" />}
                            </div>

                            <div>
                                <div className="font-medium text-white capitalize">{tx.type} {tx.asset}</div>
                                <div className="text-xs text-muted-foreground">{tx.date}</div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className={`font-medium ${tx.type === 'receive' ? 'text-emerald-400' : 'text-white'}`}>
                                {tx.type === 'receive' ? '+' : '-'}{tx.amount}
                            </div>
                            <Badge variant="outline" className={`text-[10px] h-5 px-2 border-white/10 ${tx.status === 'completed' ? 'text-emerald-400 bg-emerald-500/5' : 'text-amber-400 bg-amber-500/5'
                                }`}>
                                {tx.status}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
