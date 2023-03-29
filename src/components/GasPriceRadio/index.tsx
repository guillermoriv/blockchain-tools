'use client';

import { useGasContext } from '@/app/gas-provider';

export function GasPriceRadio() {
  const gasPriceOption = ['standard', 'fast', 'instant'];
  const { gasPrice, setGasPrice } = useGasContext();

  const handleSelect = (idx: number) => {
    setGasPrice(gasPriceOption[idx]);
  };

  return (
    <div className="col-span-1 sm:col-span-1">
      <label
        htmlFor="gas-input"
        className="block text-sm font-medium text-gray-700"
      >
        Transaction Speed
      </label>
      <fieldset className="mt-2">
        <legend className="sr-only">Gas Price Radio</legend>
        <div>
          {gasPriceOption.map((option, idx) => (
            <div key={option} className="flex items-center cursor-pointer">
              <input
                id={option}
                onChange={() => handleSelect(idx)}
                name="gas-price-option"
                type="radio"
                defaultChecked={option === gasPrice}
                className="h-4 w-4 border-base-200 text-primary focus:ring-primary-focus"
              />
              <label
                htmlFor={option}
                className="ml-3 block text-sm font-normal capitalize"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
