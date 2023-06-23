import { ImportedContract } from '@/app/store-provider';
import { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Collapsable } from '../Collapsable';
import { FormRow } from '../FormRow';
import { parseAbiStringToJson } from '@/utils/parseAbiStringToJson';
import { ParsedAbi } from '@/types/parsedAbi';
import { Abi, TransactionReceipt } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import clsx from 'clsx';

type CallProps = {
  property: ParsedAbi;
  address: `0x${string}`;
  typedAbi: Abi;
};

function Call({ property, address, typedAbi }: CallProps) {
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);
  const [inputs, setInputs] = useState<string[]>(
    new Array(property.inputs.length).fill(''),
  );

  const { config } = usePrepareContractWrite({
    address,
    abi: typedAbi,
    functionName: property.name,
    args: inputs,
  });

  const { write, data, isLoading: loadingWrite } = useContractWrite(config);

  const { isLoading: loadingTxWait } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (receipt) => {
      setReceipt(receipt);
    },
  });

  const loadingTx = loadingTxWait || loadingWrite;

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
          className={clsx(
            'border border-black px-4 py-1 hover:bg-black hover:text-white rounded-md',
            loadingTx && 'pointer-events-none opacity-50',
          )}
          onClick={() => write?.()}
          disabled={loadingTx}
        >
          Write
        </button>
        {receipt && (
          <div className="text-xs flex justify-between items-center mt-6 bg-gray-100 rounded-md p-4">
            <div>
              {receipt.status === 'success' && (
                <span className="text-green-500">Transaction Confirmed!</span>
              )}
              {receipt.status === 'reverted' && (
                <span className="text-red-500">Transaction Failed!</span>
              )}
              <button
                className="bg-black active:bg-white active:text-black text-white border border-black py-1 px-2 rounded-md ml-2"
                onClick={() =>
                  navigator.clipboard.writeText(receipt.transactionHash)
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
}: {
  selectedContract: ImportedContract;
}) {
  const { parsedAbi, typedAbi } = parseAbiStringToJson(selectedContract.abi);

  const properties = parsedAbi.filter(
    (f) =>
      f.stateMutability &&
      f.type === 'function' &&
      f.inputs.length > 0 &&
      f.stateMutability === 'nonpayable',
  );

  return (
    <>
      {properties.map((p) => (
        <Call
          property={p}
          key={p.name}
          typedAbi={typedAbi}
          address={selectedContract.address as `0x${string}`}
        />
      ))}
    </>
  );
}
