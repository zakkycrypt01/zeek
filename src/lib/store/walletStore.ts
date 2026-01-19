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
    flowId: string | null;

    login: (email: string) => Promise<void>; // Deprecated in favor of hook
    verifyOTP: (code: string) => Promise<void>; // Deprecated
    setFlowId: (id: string) => void;
    syncAuth: (isAuthenticated: boolean, user: any) => void;
    logout: () => void;
    setNetwork: (network: 'base' | 'ethereum') => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
    isAuthenticated: false,
    user: null,
    wallet: null,
    isLoading: false,
    flowId: null,

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
        // Implementation will be handled by component using CDP hooks
        // This is kept for legacy or local state sync if needed
    },

    setFlowId: (id: string) => set({ flowId: id }),

    // Sync CDP state
    syncAuth: (isAuthenticated: boolean, user: any) => {
        set({ isAuthenticated, user });
    },

    logout: () => {
        set({ isAuthenticated: false, user: null, wallet: null, flowId: null });
    },

    setNetwork: (network) => {
        set(state => ({
            wallet: state.wallet ? { ...state.wallet, network } : null
        }));
    }
}));
