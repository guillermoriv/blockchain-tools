import './../styles/global.scss';
import { GasProvider } from './gas-provider';
import { StoreProvider } from './store-provider';
import { RainbowkitProvider } from './rainbowkit-provider';

import '@rainbow-me/rainbowkit/styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blockchain - Tools',
  description:
    'Blockchain tools is a page to help you with your blockchain needs, from checking your balance to interacting with smart contracts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <RainbowkitProvider>
          <GasProvider>
            <StoreProvider>{children}</StoreProvider>
          </GasProvider>
        </RainbowkitProvider>
      </body>
    </html>
  );
}
