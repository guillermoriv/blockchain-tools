'use client';

import { txnTypes } from '@/constants';
import { createContext, useContext, useState } from 'react';

const gasContext = {
  currency: 'USD',
  usedGas: txnTypes[0].gas.toString(),
  gasPrice: 'standard',
  setCurrency: (_: string) => {},
  setUsedGas: (_: string) => {},
  setGasPrice: (_: string) => {},
};

export const useGasContext = () => {
  const ctx = useContext(GasContext);
  return { ...ctx };
};

const GasContext = createContext(gasContext);

export function GasProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<string>(gasContext.currency);
  const [usedGas, setUsedGas] = useState<string>(gasContext.usedGas);
  const [gasPrice, setGasPrice] = useState<string>(gasContext.gasPrice);

  return (
    <GasContext.Provider
      value={{
        currency,
        usedGas,
        gasPrice,
        setUsedGas,
        setCurrency,
        setGasPrice,
      }}
    >
      {children}
    </GasContext.Provider>
  );
}
