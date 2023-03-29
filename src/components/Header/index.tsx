'use client';

import { WalletButton } from '../WalletButton';
import Link from 'next/link';

export function Header() {
  return (
    <div className="flex p-4 justify-between items-center border-b border-b-black">
      <div className="flex items-center justify-between">
        <ul className="flex space-between">
          <li className="mr-2 underline hover:no-underline">
            <Link href="/">Contract data</Link>
          </li>
          <li className="mr-2 underline hover:no-underline">
            <Link href="/gas-price-calculator">Gas calculator</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        <WalletButton />
      </div>
    </div>
  );
}
