import {
  avalanche,
  bsc,
  goerli,
  mainnet,
  polygon,
  gnosis,
  arbitrum,
  bscTestnet,
  sepolia,
  arbitrumGoerli,
  moonbeam,
} from '@wagmi/chains';
import { configureChains, Connector, createClient } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

const POLLING_INTERVAL = 12_000;

const { chains, provider } = configureChains(
  [
    mainnet,
    avalanche,
    bsc,
    goerli,
    polygon,
    gnosis,
    arbitrum,
    bscTestnet,
    sepolia,
    arbitrumGoerli,
    moonbeam,
  ],
  [publicProvider()],
  {
    pollingInterval: POLLING_INTERVAL,
  },
);

export const metamaskConnector = new MetaMaskConnector({ chains });

export const injectedConnector = new InjectedConnector({ chains });

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: { projectId: 'd236b226ea7396de2556d33c49ea1538' },
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
