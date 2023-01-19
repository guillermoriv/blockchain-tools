'use client';

import { useStore } from '@/app/store-provider';

export function ContractReader() {
  const { selectedContract } = useStore();

  return selectedContract ? (
    <div className="container p-8">
      This is the current selected contract:
      {selectedContract.address}
    </div>
  ) : (
    <div className="container p-8">No contract selected</div>
  );
}
