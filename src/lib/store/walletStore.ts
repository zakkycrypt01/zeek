import { create } from 'zustand';

export interface User {
    id: string;
    email: string;
}

export interface WalletData {
    address: string;
    balance: string;
    network: 'base' | 'ethereum';
}

interface WalletStore {
    isAuthenticated: boolean;
    user: User | null;
    wallet: WalletData | null;
    isLoading: boolean;

    login: (email: string) => Promise<void>;
    verifyOTP: (code: string) => Promise<void>;
    logout: () => void;
    setNetwork: (network: 'base' | 'ethereum') => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
    isAuthenticated: false,
    user: null,
    wallet: null,
    isLoading: false,

    login: async (email: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({
            isLoading: false,
            // We don't set user yet, we wait for OTP verify
        });
    },

    verifyOTP: async (code: string) => {
        set({ isLoading: true });
        // Simulate API call and wallet generation
        await new Promise(resolve => setTimeout(resolve, 1500));

        set({
            isLoading: false,
            isAuthenticated: true,
            user: { id: 'user_123', email: 'user@example.com' },
            wallet: {
                address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // Mock address
                balance: '1.45', // Mock ETH balance
                network: 'base'
            }
        });
    },

    logout: () => {
        set({ isAuthenticated: false, user: null, wallet: null });
    },

    setNetwork: (network) => {
        set(state => ({
            wallet: state.wallet ? { ...state.wallet, network } : null
        }));
    }
}));
