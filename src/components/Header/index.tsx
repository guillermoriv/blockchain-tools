'use client';

import { WalletButton } from '../WalletButton';

export function Header() {
  return (
    <div className="flex p-4 justify-between items-center border-b border-b-black">
      <div className="text-3xl">Blockchain Tools</div>
      <WalletButton />
    </div>
  );
}
