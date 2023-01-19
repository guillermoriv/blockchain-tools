'use client';

import { useStore } from '@/app/store-provider';
import { useNetwork } from 'wagmi';

export function ContractReader() {
  const { chain } = useNetwork();
  const { selectedContract } = useStore();

  console.log(selectedContract);

  return selectedContract ? (
    <div className="container p-8">
      {chain && chain.id === selectedContract.chainId ? (
        <div>
          This is the current selected contract:
          {selectedContract.address}
        </div>
      ) : (
        <div>Please switch to the correct network to read this contract.</div>
      )}
    </div>
  ) : (
    <div className="container p-8">No contract selected</div>
  );
}
