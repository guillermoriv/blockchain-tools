'use client';

import { useStore } from '@/app/store-provider';
import { useState } from 'react';
import { FormContract } from '../FormContract';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { clamp } from '@/utils/clamp';

export function SideBar() {
  const { contracts, selectedContract, removeContract, setSelectedContract } =
    useStore();
  const [importOpen, setImportOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="rounded-md border border-black p-2 cursor-pointer mb-2 flex items-center justify-between"
        onClick={() => setImportOpen(!importOpen)}
      >
        Import a contract
        <AiOutlineArrowUp
          style={{
            transform: `${importOpen ? 'rotate(180deg)' : 'rotate(0deg)'}`,
          }}
        />
      </div>
      {importOpen && <FormContract close={() => setImportOpen(false)} />}
      <div className="mb-14" />
      <div>
        <span>Imported Contracts:</span>
        {contracts.length > 0 ? (
          contracts.map((contract) => (
            <div
              className={`p-4 border ${
                selectedContract === contract
                  ? 'border-gray-500 shadow-md shadow-gray-500'
                  : 'border-black'
              } rounded-md my-1 cursor-pointer`}
              key={contract.address}
              onClick={() => {
                if (selectedContract !== contract) {
                  setSelectedContract(contract);
                } else {
                  setSelectedContract(null);
                }
              }}
            >
              <div className="flex">
                <button
                  className="border bg-red-600 text-white px-3 py-1 rounded-md"
                  onClick={() => {
                    removeContract(contract);
                    setSelectedContract(null);
                  }}
                >
                  Delete
                </button>
              </div>
              <p>{contract.name}</p>
              <p>{clamp(contract.address, 12)}</p>
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
