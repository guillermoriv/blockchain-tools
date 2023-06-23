'use client';

import { useStore } from '@/app/store-provider';
import { useAccount, useNetwork } from 'wagmi';
import { useState } from 'react';
import { PropertiesReader } from '../PropertiesReader';
import { CallReader } from '../CallReader';
import { WriteReader } from '../WriteReader';

enum FilterReader {
  READ = 'read',
  WRITE = 'write',
  PROPERTIES = 'properties',
}

// * main component for reading data from the contract
export function ContractReader() {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { selectedContract } = useStore();

  const [filter, setFilter] = useState<FilterReader>(FilterReader.PROPERTIES);

  return selectedContract ? (
    <div className="container h-screen p-8 overflow-auto">
      {!isConnected ? (
        <div>
          Please connect to the application to use the imported contract.
        </div>
      ) : chain && chain.id === selectedContract.chainId ? (
        <div>
          <span>This is the current selected contract:</span>
          <span
            className="border border-black hover:bg-black hover:cursor-pointer hover:text-white p-2 ml-2 rounded-md"
            onClick={() =>
              navigator.clipboard.writeText(selectedContract.address)
            }
          >
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
            <PropertiesReader selectedContract={selectedContract} />
          )}
          {filter === FilterReader.READ && (
            <CallReader selectedContract={selectedContract} />
          )}
          {filter === FilterReader.WRITE && (
            <WriteReader selectedContract={selectedContract} />
          )}
        </div>
      ) : (
        <div>Please switch to the correct network to read this contract.</div>
      )}
    </div>
  ) : (
    <div className="container h-screen p-8">
      <p>No contract selected.</p>
      <p>
        Before using the application you need to select a saved contract or
        either import one.
      </p>
    </div>
  );
}
