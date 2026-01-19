import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "./globals.css";
import { CDPProvider } from "@/components/providers/CDPProvider";

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
        <CDPProvider>
          {children}
        </CDPProvider>
      </body>
    </html>
  );
}
