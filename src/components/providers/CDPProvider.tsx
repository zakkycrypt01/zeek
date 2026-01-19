"use client";

import { CDPReactProvider } from "@coinbase/cdp-react";
import { ReactNode } from "react";

export function CDPProvider({ children }: { children: ReactNode }) {
    return (
        <CDPReactProvider
            config={{
                projectId: "714f39f6-3d94-4b3f-986c-75ff1377a32c", // Placeholder Project ID as planned
                ethereum: {
                    createOnLogin: "smart", // Create smart wallet on login
                },
                appName: "CryptoCore Wallet",
            }}
        >
            {children}
        </CDPReactProvider>
    );
}
