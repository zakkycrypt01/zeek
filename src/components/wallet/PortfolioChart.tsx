"use client";

// Simple placeholder for chart
export default function PortfolioChart() {
    return (
        <div className="rounded-2xl bg-[#1e1e42]/30 border border-white/5 p-6 h-[250px] flex flex-col">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Performance</h3>
            {/* Mock Chart Visual */}
            <div className="flex-1 flex items-end gap-2 px-4 pb-2 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50" />

                {/* Random bars for visualization */}
                {[40, 60, 45, 70, 65, 80, 75, 90, 85, 95, 100, 90, 80, 85, 95].map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-primary/50 hover:bg-primary/80 transition-colors rounded-t-sm"
                        style={{ height: `${h}%` }}
                    />
                ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
                <span>Jan 01</span>
                <span>Jan 15</span>
            </div>
        </div>
    );
}
