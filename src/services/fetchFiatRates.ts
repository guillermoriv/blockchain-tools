import { currencies, networks } from '@/constants';

export const fetchFiatRates = async () => {
  const ids = networks.map((network) => network.coinGeckoId).join(',');
  const vsCurrencies = currencies.join(',');

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`,
      { next: { revalidate: 300 } },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
