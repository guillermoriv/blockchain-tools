import { networks } from '@/constants';

const API_KEY = process.env.ZAPPER_API_KEY;
const apiUrl = 'https://api.zapper.xyz/v2';

async function fetchGasNetwork(network: string) {
  const url = `${apiUrl}/gas-prices?network=${network}&api_key=${API_KEY}`;
  const gasPriceResponse = await fetch(url, {
    next: { revalidate: 300 },
  });
  try {
    const data = await gasPriceResponse.json();
    return data;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export const fetchGasPrices = async () => {
  const promises = [];

  for (const { network } of networks) {
    promises.push(fetchGasNetwork(network));
  }

  try {
    const requests = Promise.all(promises);
    const data = await requests;
    return data;
  } catch (e) {
    console.log(e);
  }
};
