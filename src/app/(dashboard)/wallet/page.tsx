"use client";

import BalanceCard from "@/components/wallet/BalanceCard";
import TokenList from "@/components/wallet/TokenList";
import PortfolioChart from "@/components/wallet/PortfolioChart";
import TransactionHistory from "@/components/wallet/TransactionHistory";

export default function WalletPage() {
    return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-6">
                    <BalanceCard />
                    <PortfolioChart />
                </div>
                <div className="md:w-[400px]">
                    <TokenList />
                </div>
            </div>

            <div className="w-full">
                <TransactionHistory />
            </div>
        </div>
    );
}
