import { ImportedContract } from '@/app/store-provider';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { toFormat, toStringFormat } from '@/utils/format';
import { useMutation } from '@tanstack/react-query';
import { Contract, utils } from 'ethers';
import { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useProvider } from 'wagmi';
import { Collapsable } from '../Collapsable';
import { FormRow } from '../FormRow';

function Call({
  property,
  contractInstance,
}: {
  property: utils.FunctionFragment;
  contractInstance: Contract;
}) {
  const [outputP, setOutputP] = useState<any[]>([]);
  const [inputs, setInputs] = useState<string[]>(
    new Array(property.inputs.length).fill(''),
  );
  console.log(property);

  async function callRead() {
    try {
      const result = await contractInstance.functions[property.name](
        ...inputs.map((i) => i.trim()),
      );
      setOutputP(result);
    } catch (error) {
      console.log(error);
    }
  }

  const call = useMutation({
    mutationFn: callRead,
    mutationKey: ['callRead', property.name],
  });

  function generateOutputs() {
    return outputP.map((output, outputIndex) => {
      return (
        <tr className="bg-gray-100 border-b" key={property.name}>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {property.outputs![outputIndex].name || 'output' + outputIndex}
          </td>
          <td
            className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
            title={toStringFormat(output)}
            onClick={() => copyToClipboard(toStringFormat(output))}
          >
            {toFormat(output)}
          </td>
        </tr>
      );
    });
  }

  return (
    <Collapsable
      className="mb-2"
      key={property.name}
      header={
        <div className="flex items-center px-4 py-3 text-sm border border-gray-100 rounded cursor-pointer bg-gray-50 collapsable-expanded:rounded-b-none">
          <div className="flex-initial w-64">{property.name}</div>
          <div className="flex-1"></div>
          <div>
            <MdExpandLess
              size={20}
              className="hidden collapsable-expanded:block"
            />
            <MdExpandMore size={20} className="collapsable-expanded:hidden" />
          </div>
        </div>
      }
    >
      <div className="p-4 bg-white border-b border-gray-100 rounded-b border-x">
        {property.inputs.map((input, inputIndex) => (
          <FormRow
            label={`${input.name || 'input' + inputIndex} (${input.type})`}
            key={inputIndex}
          >
            <input
              type="text"
              className="border border-black p-1 rounded-md"
              value={inputs[inputIndex]}
              onChange={(e) => {
                const copy = [...inputs];
                copy[inputIndex] = e.target.value;
                setInputs(copy);
              }}
            />
          </FormRow>
        ))}

        <button
          className="border border-black px-4 py-1 hover:bg-black hover:text-white rounded-md"
          onClick={() => call.mutate()}
        >
          Read
        </button>

        {outputP.length > 0 && (
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
                          Output Name
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
        )}
      </div>
    </Collapsable>
  );
}

export function CallReader({
  selectedContract,
  contractIFace,
}: {
  selectedContract: ImportedContract;
  contractIFace: utils.Interface;
}) {
  const provider = useProvider();

  const contractInstance = new Contract(
    selectedContract.address,
    selectedContract.abi,
    provider,
  );
  const properties = (
    contractIFace.fragments as utils.FunctionFragment[]
  ).filter(
    (f) =>
      f.inputs.length > 0 &&
      f.type === 'function' &&
      f.stateMutability === 'view',
  );

  return (
    <>
      {properties.map((p) => (
        <Call property={p} key={p.name} contractInstance={contractInstance} />
      ))}
    </>
  );
}
