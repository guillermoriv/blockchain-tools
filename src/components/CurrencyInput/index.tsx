'use client';

import { useGasContext } from '@/app/gas-provider';
import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { GoChevronDown } from 'react-icons/go';

type CurrencyInputProps = {
  currencies: string[];
};

export function CurrencyInput({ currencies }: CurrencyInputProps) {
  const { setCurrency } = useGasContext();

  const [selected, setSelected] = useState<number>(0);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setCurrency(currencies[idx]);
    setOpenOptions(false);
  };

  return (
    <>
      <div className="col-span-1">
        <label className="text-text-base-content/80 block text-sm font-medium">
          Currency
        </label>
        <div className="relative mt-1">
          <button
            className="relative h-full w-full cursor-pointer rounded-md border border-base-300 bg-base-100 py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
            onClick={() => setOpenOptions(!openOptions)}
          >
            <span className="block truncate">{currencies[selected]}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <GoChevronDown
                className="h-5 w-5 text-base-content/80"
                aria-hidden="true"
              />
            </span>
          </button>

          {openOptions && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {currencies.map((currency, idx) => (
                <div
                  key={currency}
                  className={clsx(
                    selected === idx
                      ? 'bg-primary text-grey'
                      : 'text-base-content',
                    'relative cursor-pointer py-2 pl-8 pr-4',
                  )}
                  onClick={() => handleSelect(idx)}
                >
                  <span
                    className={clsx(
                      selected === idx ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    )}
                  >
                    {currency}
                  </span>
                  {selected === idx ? (
                    <span
                      className={clsx(
                        selected === idx ? 'text-white' : 'text-primary',
                        'absolute inset-y-0 left-0 flex items-center pl-1.5',
                      )}
                    >
                      <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
