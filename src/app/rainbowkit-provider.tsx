'use client';

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import {
  polygon,
  arbitrum,
  arbitrumGoerli,
  mainnet,
  bsc,
  bscTestnet,
  goerli,
  polygonMumbai,
} from 'wagmi/chains';
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
  [
    polygon,
    arbitrum,
    arbitrumGoerli,
    mainnet,
    bsc,
    bscTestnet,
    goerli,
    polygonMumbai,
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: chain.rpcUrls.default.http[0] };
      },
    }),
  ],
);

const projectId = 'd236b226ea7396de2556d33c49ea1538';

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId }),
      coinbaseWallet({ chains, appName: 'Blockchain - Tools' }),
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
