'use client';

import style from './../../styles/components/WalletButton.module.scss';
import { connectorsByName } from '@/connector/wagmi';
import { useAccount, useConnect } from 'wagmi';
import clsx from 'clsx';
import { clamp } from '@/utils/clamp';
import { useEffect, useState } from 'react';

export function WalletButton() {
  const { connect, isLoading } = useConnect();
  const { isConnected, address } = useAccount();

  // * this should solve the issue with hydration
  // * probably try to find a better solution for this
  const [rendering, setRendering] = useState<boolean>(true);
  useEffect(() => setRendering(false), []);

  return !rendering ? (
    isConnected ? (
      <div className={style.connect_btn}>{clamp(address as string, 12)}</div>
    ) : (
      <div
        className={clsx(isLoading && style.loading, style.connect_btn)}
        onClick={() => connect({ connector: connectorsByName['Metamask'] })}
      >
        Connect
      </div>
    )
  ) : (
    <div className={style.connect_btn}>Connect</div>
  );
}
