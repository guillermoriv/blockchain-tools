'use client';

import { useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export type Network = {
  name: string;
  chainId: number;
  disabled: boolean;
};

// * this should be the networks that we currently support on blockchainTools
const networks: Network[] = [
  { name: 'Ethereum', chainId: 1, disabled: false },
  { name: 'Polygon', chainId: 137, disabled: false },
  { name: 'Avalanche', chainId: 43114, disabled: false },
  {
    name: 'Moonbeam',
    chainId: 1284,
    disabled: false,
  },
];

export default function SelectNetwork() {
  const { chain } = useNetwork();
  const {
    switchNetworkAsync: switchNetwork,
    reset,
    pendingChainId,
  } = useSwitchNetwork({
    onSettled: () => reset(),
  });

  const [selectedNetwork, setSelectedNetwork] = useState<number>(
    networks[0].chainId,
  );

  useEffect(() => {
    if (chain) {
      setSelectedNetwork(chain.id);
    }
  }, [chain]);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const currentValue = selectedNetwork;
    const parsedValue = parseInt(e.target.value);

    try {
      setSelectedNetwork(parsedValue);
      await switchNetwork?.(parsedValue);
    } catch (error) {
      setSelectedNetwork(currentValue);
    }
  }

  return (
    <select
      className="rounded-md px-6 py-2 border border-black"
      value={selectedNetwork}
      onChange={handleChange}
      disabled={!!pendingChainId}
    >
      {networks.map((network) => (
        <option value={network.chainId} key={network.chainId}>
          {network.name}
        </option>
      ))}
    </select>
  );
}
