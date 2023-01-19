import { avalanche, bsc, goerli, mainnet, polygon } from '@wagmi/chains';
import { Chain, configureChains, Connector, createClient } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcBatchProvider } from './jsonRpcBatchProvider';

const networks: { [chainId: number]: Chain } = {
  1: {
    ...mainnet,
    rpcUrls: {
      default: { http: [String(process.env.NEXT_PUBLIC_ETH)] },
    },
  },
  5: {
    ...goerli,
    rpcUrls: {
      default: { http: [String(process.env.NEXT_PUBLIC_GOERLI)] },
    },
  },
  56: {
    ...bsc,
    rpcUrls: {
      default: { http: [String(process.env.NEXT_PUBLIC_BSC)] },
    },
  },
  137: {
    ...polygon,
    rpcUrls: {
      default: { http: [String(process.env.NEXT_PUBLIC_MATIC)] },
    },
  },
  43_114: {
    ...avalanche,
    rpcUrls: {
      default: { http: [String(process.env.NEXT_PUBLIC_AVALANCHE)] },
    },
  },
  246: {
    id: 246,
    name: 'Energy Web Chain',
    network: 'ewc',
    nativeCurrency: {
      decimals: 18,
      name: 'EWT',
      symbol: 'EWT',
    },
    rpcUrls: {
      default: { http: [String(process.env.NEXT_PUBLIC_EWC)] },
    },
    blockExplorers: {
      etherscan: {
        name: 'EnergyWeb Explorer',
        url: 'https://explorer.energyweb.org',
      },
      default: {
        name: 'EnergyWeb Explorer',
        url: 'https://explorer.energyweb.org',
      },
    },
  },
  1284: {
    id: 1_284,
    name: 'Moonbeam',
    network: 'moonbeam',
    nativeCurrency: {
      decimals: 18,
      name: 'DEV',
      symbol: 'DEV',
    },
    rpcUrls: {
      default: { http: [String(process.env.NEXT_PUBLIC_MOONBEAM)] },
    },
    blockExplorers: {
      etherscan: { name: 'Moonscan', url: 'https://moonscan.io' },
      default: { name: 'Moonscan', url: 'https://moonscan.io' },
    },
  },
};

const POLLING_INTERVAL = 12_000;

const { chains, provider } = configureChains(
  Object.values(networks),
  [
    jsonRpcBatchProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
    publicProvider(),
  ],
  {
    pollingInterval: POLLING_INTERVAL,
  },
);

export const metamaskConnector = new MetaMaskConnector({ chains });

export const injectedConnector = new InjectedConnector({ chains });

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});

export const client = createClient({
  autoConnect: true,
  connectors: [metamaskConnector, walletConnectConnector],
  provider,
});

export enum ConnectorNames {
  Metamask = 'Metamask',
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}

export const connectorsByName: {
  [connectorName in ConnectorNames]: Connector;
} = {
  [ConnectorNames.Injected]: injectedConnector,
  [ConnectorNames.Metamask]: metamaskConnector,
  [ConnectorNames.WalletConnect]: walletConnectConnector,
};
