import { ImportedContract } from '@/app/store-provider';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { toFormat, toStringFormat } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import { Contract, ContractFunction, utils } from 'ethers';
import { useNetwork, useProvider } from 'wagmi';

export function PropertiesReader({
  selectedContract,
  contractIFace,
}: {
  selectedContract: ImportedContract;
  contractIFace: utils.Interface;
}) {
  const provider = useProvider();
  const { chain } = useNetwork();
  const properties = (
    contractIFace.fragments as utils.FunctionFragment[]
  ).filter(
    (f) =>
      f.inputs.length === 0 &&
      f.type === 'function' &&
      f.stateMutability === 'view',
  );

  async function fetchProperty(func: ContractFunction) {
    try {
      const result = await func();
      return result;
    } catch (e: any) {
      console.error(e);
      return e.reason || e.message || 'Unknown error';
    }
  }

  async function fetchProperties(): Promise<any[][]> {
    const contract = new Contract(
      selectedContract.address,
      selectedContract.abi,
      provider,
    );

    const funcs = (contractIFace.fragments as utils.FunctionFragment[]).filter(
      (f) =>
        f.inputs.length === 0 &&
        f.type === 'function' &&
        f.stateMutability === 'view',
    );

    const propertiesPR = funcs.map((func) =>
      fetchProperty(contract.functions[func.name]),
    );

    return await Promise.all(propertiesPR);
  }

  const { data: outputsP, isLoading } = useQuery<any[][]>({
    queryKey: ['fetchedProperties', selectedContract.address],
    queryFn: fetchProperties,
    enabled:
      !!contractIFace &&
      !!chain &&
      !!selectedContract &&
      chain.id === selectedContract.chainId &&
      !!provider,
    staleTime: 1000 * 60 * 5,
  });

  function generateOutputs() {
    return properties.map((p, idx) => {
      const currentValue = outputsP![idx][0];

      return (
        <tr className="bg-gray-100 border-b" key={p.name}>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {p.name}
          </td>
          <td
            className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
            title={toStringFormat(currentValue)}
            onClick={() => copyToClipboard(toStringFormat(currentValue))}
          >
            {toFormat(currentValue)}
          </td>
        </tr>
      );
    });
  }

  return !isLoading ? (
    <div className="flex flex-col rounded-md border border-black mt-10">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Property Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>{generateOutputs()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
