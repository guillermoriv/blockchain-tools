import './../styles/global.scss';
import { GasProvider } from './gas-provider';
import { QueryProvider } from './query-provider';
import { StoreProvider } from './store-provider';
import { WagmiProvider } from './wagmi-provider';

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
        <WagmiProvider>
          <QueryProvider>
            <GasProvider>
              <StoreProvider>{children}</StoreProvider>
            </GasProvider>
          </QueryProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
