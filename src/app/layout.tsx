import type { Metadata } from "next";
import "@fontsource/inter";
import "@fontsource/outfit";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "CryptoCore Wallet",
  description: "Secure web-based crypto wallet with fiat offramp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-sans bg-background text-foreground selection:bg-primary/30">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
