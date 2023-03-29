import { Card } from '@/components/Card';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Footer } from '@/components/Footer';
import { GasPriceRadio } from '@/components/GasPriceRadio';
import { Header } from '@/components/Header';
import { Table } from '@/components/Table';
import { UsedGasInput } from '@/components/UsedGasInput';
import { currencies, networks } from '@/constants';
import { fetchFiatRates } from '@/services/fetchFiatRates';
import { fetchGasPrices } from '@/services/fetchGasPrices';
import { notFound } from 'next/navigation';

export default async function Page() {
  const [gasPrices, fiatRates] = await Promise.all([
    fetchGasPrices(),
    fetchFiatRates(),
  ]);

  if (!gasPrices || !fiatRates) {
    notFound();
  }

  const networkPrices = networks.map((network, index) => {
    const gasPrice = gasPrices[index];

    const tokenPrice = fiatRates[network.coinGeckoId];

    return {
      ...network,
      gasPrice,
      tokenPrice,
    };
  });

  return (
    <main className="flex max-h-screen max-w-screen">
      <div className="w-1/3 h-screen border-r border-r-black p-4">
        <Card
          title="Local Currency"
          description="Select the currency you want the fees to be displayed in."
        >
          <CurrencyInput currencies={currencies} />
        </Card>
        <Card
          title="Used Gas"
          description="Every transaction uses gas. Pick a common transaction type or enter a custom amount of gas used."
        >
          <UsedGasInput />
        </Card>
        <Card
          title="Gas Price"
          description="Gas fees are paid in each network's native currency."
        >
          <GasPriceRadio />
        </Card>
      </div>
      <div className="container flex flex-col">
        <Header />
        <Table networkPrices={networkPrices} />
        <Footer />
      </div>
    </main>
  );
}
