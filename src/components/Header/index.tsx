'use client';

import SelectNetwork from '../SelectNetwork';
import { WalletButton } from '../WalletButton';
import { RiShieldKeyholeLine } from 'react-icons/ri';

export function Header() {
  return (
    <div className="flex p-4 justify-between items-center border-b border-b-black">
      <div className="text-3xl bold flex items-center">
        Blockchain Tools <RiShieldKeyholeLine className="ml-3" size={40} />
      </div>
      <div className="flex items-center">
        <SelectNetwork />
        <div className="m-2" />
        <WalletButton />
      </div>
    </div>
  );
}
