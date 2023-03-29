import { ImportedContract } from '@/app/store-provider';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useMutation } from '@tanstack/react-query';
import {
  Contract,
  ContractReceipt,
  ContractTransaction,
  providers,
  utils,
} from 'ethers';
import { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useSigner } from 'wagmi';
import { Collapsable } from '../Collapsable';
import { FormRow } from '../FormRow';

function Call({
  property,
  contractInstance,
}: {
  property: utils.FunctionFragment;
  contractInstance: Contract;
}) {
  const [receipt, setReceipt] = useState<ContractReceipt | null>(null);
  const [inputs, setInputs] = useState<string[]>(
    new Array(property.inputs.length).fill(''),
  );

  async function callWrite() {
    setReceipt(null);

    try {
      const tx = (await contractInstance.functions[property.name](
        ...inputs.map((i) => i.trim()),
      )) as ContractTransaction;

      const receipt = await tx.wait();
      setReceipt(receipt);
    } catch (error) {
      console.log(error);
    }
  }

  const call = useMutation({
    mutationFn: callWrite,
    mutationKey: ['callWrite', property.name],
  });

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
          disabled={call.isLoading}
        >
          Write
        </button>
        {receipt && (
          <div className="text-xs flex justify-between items-center mt-6 bg-gray-100 rounded-md p-4">
            <div>
              {receipt.status === 1 && (
                <span className="text-green-500">Transaction Confirmed!</span>
              )}
              {receipt.status === 2 && (
                <span className="text-red-500">Transaction Failed!</span>
              )}
              <button
                className="bg-black active:bg-white active:text-black text-white border border-black py-1 px-2 rounded-md ml-2"
                onClick={() =>
                  copyToClipboard(JSON.stringify(receipt, null, 2))
                }
              >
                Copy Receipt
              </button>
            </div>
            <span className="cursor-pointer" onClick={() => setReceipt(null)}>
              X
            </span>
          </div>
        )}
      </div>
    </Collapsable>
  );
}

export function WriteReader({
  selectedContract,
  contractIFace,
}: {
  selectedContract: ImportedContract;
  contractIFace: utils.Interface;
}) {
  const { data: signerProvider } = useSigner();

  const contractInstance = new Contract(
    selectedContract.address,
    selectedContract.abi,
    signerProvider as providers.JsonRpcSigner,
  );
  const properties = (
    contractIFace.fragments as utils.FunctionFragment[]
  ).filter(
    (f) =>
      f.inputs.length > 0 &&
      f.type === 'function' &&
      f.stateMutability === 'nonpayable',
  );

  return (
    <>
      {properties.map((p) => (
        <Call property={p} key={p.name} contractInstance={contractInstance} />
      ))}
    </>
  );
}
