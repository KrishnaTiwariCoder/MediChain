"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  account: string | null;
  setAccount: (account: string | null) => void;
  role: 'user' | 'doctor' | null;
  setRole: (role: 'user' | 'doctor' | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [role, setRole] = useState<'user' | 'doctor' | null>(null);

  return (
    <WalletContext.Provider value={{ account, setAccount, role, setRole }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}