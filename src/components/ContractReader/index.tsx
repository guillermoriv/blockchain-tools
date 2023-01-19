'use client';

import { useStore } from '@/app/store-provider';
import { useNetwork, useProvider } from 'wagmi';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import { PropertiesReader } from '../PropertiesReader';
import { CallReader } from '../CallReader';

enum FilterReader {
  READ = 'read',
  WRITE = 'write',
  PROPERTIES = 'properties',
}

// * main component for reading data from the contract
export function ContractReader() {
  const { chain } = useNetwork();
  const provider = useProvider();
  const { selectedContract } = useStore();

  const [filter, setFilter] = useState<FilterReader>(FilterReader.PROPERTIES);
  const [contractIFace, setContractIFace] = useState<utils.Interface | null>(
    null,
  );

  useEffect(() => {
    if (selectedContract) {
      try {
        const iface = new utils.Interface(selectedContract.abi);
        setContractIFace(iface);
      } catch (e) {
        setContractIFace(null);
      }
    } else {
      setContractIFace(null);
    }
  }, [selectedContract]);

  return selectedContract && contractIFace ? (
    <div className="container p-8 overflow-auto">
      {chain && chain.id === selectedContract.chainId ? (
        <div>
          <span>This is the current selected contract:</span>
          <span className="border border-black p-2 ml-2 rounded-md">
            {selectedContract.address}
          </span>
          <ul className="flex my-6">
            <li
              className={`p-2 border rounded-l-md border-black cursor-pointer ${
                filter === FilterReader.PROPERTIES ? 'bg-black text-white' : ''
              }`}
              onClick={() => setFilter(FilterReader.PROPERTIES)}
            >
              Properties
            </li>
            <li
              className={`p-2 border-t border-b border-black cursor-pointer ${
                filter === FilterReader.READ ? 'bg-black text-white' : ''
              }`}
              onClick={() => setFilter(FilterReader.READ)}
            >
              Read
            </li>
            <li
              className={`p-2 border rounded-r-md border-black cursor-pointer ${
                filter === FilterReader.WRITE ? 'bg-black text-white' : ''
              }`}
              onClick={() => setFilter(FilterReader.WRITE)}
            >
              Write
            </li>
          </ul>
          {filter === FilterReader.PROPERTIES && (
            <PropertiesReader
              selectedContract={selectedContract}
              contractIFace={contractIFace}
            />
          )}
          {filter === FilterReader.READ && (
            <CallReader
              selectedContract={selectedContract}
              contractIFace={contractIFace}
            />
          )}
        </div>
      ) : (
        <div>Please switch to the correct network to read this contract.</div>
      )}
    </div>
  ) : (
    <div className="container p-8">No contract selected</div>
  );
}
