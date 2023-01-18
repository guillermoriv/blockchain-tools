// * notice, these are simple types for the rpcBatch provider into wagmi, so we keep the types safety

import { providers } from 'ethers';
import { Chain } from 'wagmi';

type ChainProviderFn<
  TProvider extends Provider = providers.BaseProvider,
  TChain extends Chain = Chain,
> = (chain: TChain) => {
  chain: TChain;
  provider: () => ProviderWithFallbackConfig<TProvider>;
} | null;

type FallbackProviderConfig = Omit<
  providers.FallbackProviderConfig,
  'provider'
>;
type ProviderWithFallbackConfig<TProvider extends Provider = Provider> =
  TProvider & FallbackProviderConfig;
type Provider = providers.BaseProvider & { chains?: Chain[] };

type JsonRpcBatchProviderConfig = FallbackProviderConfig & {
  rpc: (chain: Chain) => { http: string; webSocket?: string } | null;
  static?: boolean;
};

export function jsonRpcBatchProvider({
  priority,
  rpc,
  stallTimeout,
  weight,
}: JsonRpcBatchProviderConfig): ChainProviderFn<providers.JsonRpcBatchProvider> {
  return function (chain) {
    const rpcConfig = rpc(chain);
    if (!rpcConfig || rpcConfig.http === '') return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: { http: [rpcConfig.http] },
        },
      },
      provider: () => {
        const RpcProvider = providers.JsonRpcBatchProvider;
        const provider = new RpcProvider(rpcConfig.http, {
          chainId: chain.id,
          name: chain.network,
        });
        return Object.assign(provider, { priority, stallTimeout, weight });
      },
    };
  };
}
