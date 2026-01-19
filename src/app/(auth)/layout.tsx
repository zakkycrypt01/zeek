import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
            {/* Background Decor - Optional glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Header/Logo */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="bg-white/10 p-2 rounded-lg border border-white/5 backdrop-blur-md">
                    {/* Simple logo icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-white font-heading">CRYPTOCORE</span>
            </div>

            {/* Support Button */}
            <div className="absolute top-6 right-6">
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 backdrop-blur-sm">
                    Support
                </Link>
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                {children}
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center text-xs text-muted-foreground space-x-6">
                <Link href="#" className="hover:text-primary transition-colors">PRIVACY</Link>
                <Link href="#" className="hover:text-primary transition-colors">TERMS</Link>
                <Link href="#" className="hover:text-primary transition-colors">NETWORK STATUS</Link>
            </div>
        </div>
    );
}
