"use client";

import TransactionHistory from "@/components/wallet/TransactionHistory";

export default function HistoryPage() {
    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white font-heading">Transaction History</h1>
                <p className="text-muted-foreground">View all your incoming and outgoing transactions</p>
            </div>

            <div className="w-full">
                <TransactionHistory />
            </div>
        </div>
    );
}
