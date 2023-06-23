import { ImportedContract } from '@/app/store-provider';
import { toFormat, toStringFormat } from '@/utils/format';
import { parseAbiStringToJson } from '@/utils/parseAbiStringToJson';
import { useContractReads } from 'wagmi';

export function PropertiesReader({
  selectedContract,
}: {
  selectedContract: ImportedContract;
}) {
  const { parsedAbi, typedAbi } = parseAbiStringToJson(selectedContract.abi);

  const properties = parsedAbi.filter(
    (f) =>
      f.stateMutability &&
      f.type === 'function' &&
      f.stateMutability === 'view' &&
      f.inputs.length === 0 &&
      f.name,
  );

  const propertiesCalls = properties.map((p) => ({
    address: selectedContract.address as `0x${string}`,
    abi: typedAbi,
    functionName: p.name,
  }));

  const { data: outputsP } = useContractReads({
    contracts: propertiesCalls,
  });

  function generateOutputs() {
    if (!outputsP) return [];

    return properties.map((p, idx) => {
      const currentValue = outputsP[idx].result;

      return (
        <tr className="bg-gray-100 border-b" key={p.name}>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {p.name}
          </td>
          <td
            className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
            title={toStringFormat(currentValue)}
            onClick={() =>
              navigator.clipboard.writeText(toStringFormat(currentValue))
            }
          >
            {currentValue !== undefined ? toFormat(currentValue) : 'N/A'}
          </td>
        </tr>
      );
    });
  }

  return (
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
  );
}
