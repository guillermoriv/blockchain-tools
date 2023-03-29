'use client';

import { useGasContext } from '@/app/gas-provider';
import { txnTypes } from '@/constants';
import { TxnType } from '@/types';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';

export function UsedGasInput() {
  const { usedGas, setUsedGas } = useGasContext();

  const [selected, setSelected] = useState<number>(0);
  const [selectedTxnType, setSelectedTxnType] = useState<TxnType>(txnTypes[0]);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    handleTxnTypeChange(txnTypes[idx]);
    setOpenOptions(false);
  };

  function handleGasInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsedGas(event.target.value);
    setSelectedTxnType({ name: 'Custom', gas: Number(event.target.value) });
  }

  function handleTxnTypeChange(event: TxnType) {
    setSelectedTxnType(event);
    setUsedGas(event.gas.toString());
  }

  const txnTypesWithCustom = [...txnTypes, { name: 'Custom', gas: usedGas }];

  return (
    <>
      <div className="col-span-1 sm:col-span-1">
        <label className="block text-sm font-medium text-gray-700">
          Transaction Type
        </label>
        <div className="relative mt-1">
          <button
            className="relative w-full cursor-cursor rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-focus focus:outline-none focus:ring-1 focus:ring-primary-focus sm:text-sm"
            onClick={() => setOpenOptions(!openOptions)}
          >
            <span className="block truncate">{selectedTxnType?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* <ChevronUpDownIcon
                className="h-5 w-5 text-gray-600"
                aria-hidden="true"
              /> */}
            </span>
          </button>
          {openOptions && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {txnTypesWithCustom.map((txn, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    selected === idx
                      ? 'bg-primary text-primary-content'
                      : 'text-base-content',
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                  )}
                  onClick={() => handleSelect(idx)}
                >
                  <span
                    className={clsx(
                      selected === idx ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    )}
                  >
                    {txn.name}
                  </span>

                  {selected ? (
                    <span
                      className={clsx(
                        selected === idx
                          ? 'text-primary-content'
                          : 'text-primary',
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                      )}
                    >
                      {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
        <label
          htmlFor="gas-input"
          className="block pt-4 text-sm font-medium text-gray-700"
        >
          Used Gas
        </label>
        <input
          className="relative w-full cursor-cursor rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-focus focus:outline-none focus:ring-1 focus:ring-primary-focus sm:text-sm"
          onChange={handleGasInputChange}
          type="number"
          name="gas-input"
          id="gas-input"
          value={usedGas}
          inputMode="numeric"
        />
      </div>
    </>
  );
}
