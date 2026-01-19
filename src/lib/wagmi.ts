import { http, createConfig } from 'wagmi';
import { base, mainnet } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
    chains: [base, mainnet],
    multiInjectedProviderDiscovery: false,
    connectors: [
        coinbaseWallet({
            appName: 'CryptoCore Wallet',
            preference: 'smartWalletOnly', // Forces Smart Wallet (Embedded) experience
        }),
    ],
    transports: {
        [base.id]: http(),
        [mainnet.id]: http(),
    },
});
