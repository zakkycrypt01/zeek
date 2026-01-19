import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Sidebar - Hidden on mobile */}
            <aside className="hidden md:flex w-64 flex-col border-r border-[#312e81]/30 bg-[#151535]/50 backdrop-blur-xl z-20">
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden relative z-10">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
                    <div className="mx-auto max-w-6xl space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
