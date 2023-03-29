import { networks } from '@/constants';

const API_KEY = process.env.ZAPPER_API_KEY;
const apiUrl = 'https://api.zapper.xyz/v2';

async function fetchGasNetwork(network: string) {
  const url = `${apiUrl}/gas-prices?network=${network}&api_key=${API_KEY}`;
  const gasPriceResponse = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (gasPriceResponse.status === 200) {
    try {
      return await gasPriceResponse.json();
    } catch (e) {
      return {
        eip1559: false,
        standard: 0,
        fast: 0,
        instant: 0,
      };
    }
  }

  return {
    eip1559: false,
    standard: 0,
    fast: 0,
    instant: 0,
  };
}

export const fetchGasPrices = async () => {
  const promises = [];

  for (const { network } of networks) {
    promises.push(fetchGasNetwork(network));
  }

  try {
    return await Promise.all(promises);
  } catch (e) {
    console.log(e);
  }

  return networks.map(() => ({
    eip1559: false,
    standard: 0,
    fast: 0,
    instant: 0,
  }));
};
