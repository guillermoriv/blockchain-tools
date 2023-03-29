'use client';

import { useGasContext } from '@/app/gas-provider';
import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

type TableProps = { networkPrices: any };

export function Table({ networkPrices }: TableProps) {
  const { currency, usedGas, gasPrice } = useGasContext();
  const [networkPricesData, setNetworkPricesData] = useState(networkPrices);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const editName =
      name === 'gasPrice'
        ? gasPrice.toLocaleLowerCase()
        : currency.toLocaleLowerCase();

    const editData = networkPricesData.map((n: any, idx: number) =>
      idx === index && name
        ? {
            ...n,
            [name]: {
              ...n[name],
              [editName]: Number(value),
            },
          }
        : n,
    );

    setNetworkPricesData(editData);
  };

  return (
    <div className="mt-8 mb-8 flex flex-col overflow-y-auto">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-base-300">
            <thead className="bg-base-300">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-base-content sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                >
                  Token
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                >
                  Gas Used
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                >
                  Gas Price
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                >
                  Current Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300 bg-base-100">
              {networkPricesData.map((network: any, idx: number) => (
                <tr key={network?.website}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          className="h-10 w-10 object-contain"
                          src={network.image}
                          height={40}
                          width={40}
                          alt={network.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-base-content">
                          {network?.name}
                        </div>
                        <a
                          target={'_blank'}
                          href={network?.website}
                          rel="noopener noreferrer"
                          className="text-base-content/80 hover:text-primary"
                        >
                          {network?.website}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content/80">
                    <span
                      className={clsx(
                        network.type === 'Layer 1'
                          ? 'bg-accent text-accent-content'
                          : network.type === 'Sidechain'
                          ? 'bg-primary text-primary-content'
                          : 'bg-secondary text-secondary-content',
                        'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                      )}
                    >
                      {network?.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content/80">
                    <div className="text-sm font-semibold text-base-content">
                      {network.symbol}
                    </div>
                    <div className="text-sm text-base-content/80">
                      <input
                        className="w-24"
                        name="tokenPrice"
                        value={network.tokenPrice[currency.toLocaleLowerCase()]}
                        type="number"
                        inputMode="numeric"
                        onChange={(e) => onChangeInput(e, idx)}
                        placeholder="Type Value"
                      />
                      {currency}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm ">
                    {usedGas}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content/80">
                    <div className="text-sm font-semibold capitalize text-base-content">
                      {gasPrice}
                    </div>
                    <div className="text-sm text-base-content/80">
                      <input
                        className="w-10"
                        name="gasPrice"
                        value={network.gasPrice[gasPrice.toLocaleLowerCase()]}
                        type="number"
                        inputMode="numeric"
                        onChange={(e) => onChangeInput(e, idx)}
                        placeholder="Type Value"
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-base-content">
                    {(
                      (network.tokenPrice[currency.toLocaleLowerCase()] *
                        Number(usedGas) *
                        network.gasPrice[gasPrice]) /
                      10 ** 9
                    ).toFixed(4)}{' '}
                    {currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
