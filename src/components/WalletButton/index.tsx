'use client';

import style from './../../styles/components/WalletButton.module.scss';
import { connectorsByName } from '@/connector/wagmi';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import clsx from 'clsx';
import { clamp } from '@/utils/clamp';
import { useEffect, useState } from 'react';
import { copyToClipboard } from '@/utils/copyToClipboard';

export function WalletButton() {
  const { connect, isLoading } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const [oDisconnect, setODisconnect] = useState<boolean>(false);

  // * this should solve the issue with hydration
  // * probably try to find a better solution for this
  const [rendering, setRendering] = useState<boolean>(true);
  useEffect(() => setRendering(false), []);

  return !rendering ? (
    isConnected ? (
      <div className="relative">
        <div
          className={style.connect_btn}
          onClick={() => setODisconnect(!oDisconnect)}
        >
          <span>{clamp(address as string, 12)}</span>
        </div>
        {oDisconnect && (
          <div className="border border-black p-4 bg-white rounded-md absolute right-0 top-12">
            <button
              className="p-2 border border-black hover:bg-black hover:text-white rounded-md"
              onClick={() => {
                setODisconnect(false);
                disconnect();
              }}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
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
