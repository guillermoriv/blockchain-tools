'use client';

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygon, arbitrum, arbitrumGoerli } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import {
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
  braveWallet,
  walletConnectWallet,
  safeWallet,
  trustWallet,
  rabbyWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

const { chains, publicClient } = configureChains(
  [polygon, arbitrum, arbitrumGoerli],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: chain.rpcUrls.default.http[0] };
      },
    }),
  ],
);

const projectId = 'be96f3154a4bbc8744b43d4f9d956088';

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId }),
      coinbaseWallet({ chains, appName: 'PariFi - dApp' }),
      rabbyWallet({ chains }),
      trustWallet({ chains, projectId }),
      safeWallet({ chains }),
      ledgerWallet({ chains, projectId }),
      braveWallet({ chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function RainbowkitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={darkTheme()}
        showRecentTransactions
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
