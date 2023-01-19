'use client';

import { useStore } from '@/app/store-provider';
import { useState } from 'react';
import { FormContract } from '../FormContract';

export function SideBar() {
  const { contracts, selectedContract, removeContract, setSelectedContract } =
    useStore();
  const [importOpen, setImportOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="rounded-md border border-black p-2 cursor-pointer mb-2"
        onClick={() => setImportOpen(!importOpen)}
      >
        Import a contract
      </div>
      {importOpen && <FormContract close={() => setImportOpen(false)} />}
      <div className="mb-14" />
      <div>
        <span>Imported Contracts:</span>
        {contracts.map((contract) => (
          <div
            className={`p-2 border ${
              selectedContract === contract ? 'border-blue-600' : 'border-black'
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
            <div>
              <button
                className="border p-1"
                onClick={() => {
                  removeContract(contract);
                  setSelectedContract(null);
                }}
              >
                Delete
              </button>
            </div>
            <span>{contract.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
