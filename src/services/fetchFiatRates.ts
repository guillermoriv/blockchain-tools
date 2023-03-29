import { currencies, networks } from '@/constants';

export const fetchFiatRates = async (): Promise<any> => {
  const ids = networks.map((network) => network.coinGeckoId).join(',');
  const vsCurrencies = currencies.join(',');

  try {
    // const response = await fetch(
    //   `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`,
    //   { next: { revalidate: 300 } },
    // );

    // if (response.status === 200) {
    //   return await response.json();
    // }

    throw new Error('error');
  } catch (error) {
    console.log(error);
  }

  return networks.reduce(
    (acc, n) => ({
      ...acc,
      [n.coinGeckoId]: currencies.reduce(
        (acc, cur) => ({ ...acc, [cur.toLocaleLowerCase()]: 0 }),
        {},
      ),
    }),
    {},
  );
};
