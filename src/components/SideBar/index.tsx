'use client';

import { ImportedContract, useStore } from '@/app/store-provider';
import { MouseEvent, useState } from 'react';
import { FormContract } from '../FormContract';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { clamp } from '@/utils/clamp';

export function SideBar() {
  const { contracts, selectedContract, removeContract, setSelectedContract } =
    useStore();
  const [importOpen, setImportOpen] = useState<boolean>(false);
  const [pastContract, setPastContract] = useState<ImportedContract | null>(
    null,
  );

  const handleImport = (_: MouseEvent<HTMLElement>) => {
    setImportOpen(!importOpen);
    setPastContract(null);
  };

  return (
    <>
      <button
        className="rounded-md border border-black p-2 cursor-pointer mb-2 flex items-center justify-between w-full transition-all"
        onClick={handleImport}
      >
        Import a contract
        <AiOutlineArrowUp
          style={{
            transform: `${importOpen ? 'rotate(180deg)' : 'rotate(0deg)'}`,
          }}
        />
      </button>
      {importOpen && (
        <FormContract
          close={() => setImportOpen(false)}
          pastContract={pastContract}
        />
      )}
      <div className="mb-14" />
      <div>
        <span>Imported Contracts:</span>
        {contracts.length > 0 ? (
          contracts.map((contract, idx) => (
            <div
              className={`p-4 border ${
                selectedContract === contract
                  ? 'border-gray-500 shadow-md shadow-gray-500'
                  : 'border-black'
              } rounded-md my-1`}
              key={idx}
            >
              <div className="flex">
                <button
                  className="border bg-red-600 text-white px-3 py-1 rounded-md"
                  onClick={() => {
                    removeContract(contract);
                    if (selectedContract === contract)
                      setSelectedContract(null);
                  }}
                >
                  Delete
                </button>
                <button
                  className="border bg-green-600 text-white px-3 py-1 rounded-md"
                  onClick={() => {
                    if (selectedContract !== contract) {
                      setSelectedContract(contract);
                    } else {
                      setSelectedContract(null);
                    }
                  }}
                >
                  Select
                </button>
                <button
                  className="border bg-blue-400 text-white px-3 py-1 rounded-md"
                  onClick={() => {
                    if (pastContract !== contract) {
                      setPastContract(contract);
                    } else {
                      setPastContract(null);
                    }
                    setImportOpen(!importOpen);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className="border-b my-4 border-b-black" />
              <p>{contract.name}</p>
              <p
                className="hover:underline hover:cursor-pointer"
                onClick={() => navigator.clipboard.writeText(contract.address)}
              >
                {clamp(contract.address, 12)}
              </p>
              <p>Network: {contract.chainId}</p>
            </div>
          ))
        ) : (
          <div>No contracts imported yet.</div>
        )}
      </div>
    </>
  );
}
