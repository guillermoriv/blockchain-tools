'use client';

import SelectNetwork from '../SelectNetwork';
import { WalletButton } from '../WalletButton';

export function Header() {
  return (
    <div className="flex p-4 justify-between items-center border-b border-b-black">
      <div className="text-3xl">Blockchain Tools</div>
      <div className="flex items-center">
        <SelectNetwork />
        <div className="m-2" />
        <WalletButton />
      </div>
    </div>
  );
}
