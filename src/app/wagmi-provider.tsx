'use client';

import { client } from '@/connector/wagmi';
import { WagmiConfig } from 'wagmi';

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
