import { ImportedContract } from '@/app/store-provider';
import { toFormat } from '@/utils/format';
import { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Collapsable } from '../Collapsable';
import { FormRow } from '../FormRow';
import type { ParsedAbi } from '@/types/parsedAbi';
import { useContractRead } from 'wagmi';
import { parseAbiStringToJson } from '@/utils/parseAbiStringToJson';
import { Abi } from 'viem';
import { Tooltip } from 'react-tooltip';

function DisplayData({ data }: { data: any }) {
  const renderData = () => {
    if (Array.isArray(data)) {
      return (
        <ul className="space-y-1">
          {data.map((value, index) => (
            <li key={index} className="text-sm text-gray-700">
              <DisplayData data={value} />
            </li>
          ))}
        </ul>
      );
    }

    if (typeof data === 'object' && data !== null) {
      return (
        <ul className="space-y-1">
          {Object.keys(data).map((key) => (
            <li key={key} className="text-sm text-gray-700">
              <strong className="font-semibold">{key}: </strong>
              <DisplayData data={data[key]} />
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div
        className="px-2 py-1 rounded-md bg-gray-100 text-sm text-gray-700"
        onClick={(e) => {
          const currentTarget = e.currentTarget;

          currentTarget.setAttribute('data-tooltip-content', 'Copied!');

          navigator.clipboard
            .writeText(data)
            .then(() =>
              setTimeout(
                () =>
                  currentTarget.setAttribute(
                    'data-tooltip-content',
                    'Copy transaction hash',
                  ),
                1500,
              ),
            )
            .catch((err) => {
              console.error('Could not copy text: ', err);
            });
        }}
        data-tooltip-id="copy-data"
        data-tooltip-content="Copy"
      >
        {data}
        <Tooltip id="copy-data" />
      </div>
    );
  };

  return <div>{renderData()}</div>;
}

type CallProps = {
  property: ParsedAbi;
  address: `0x${string}`;
  typedAbi: Abi;
};

function Call({ property, address, typedAbi }: CallProps) {
  const [outputP, setOutputP] = useState<any | null>(null);
  const [inputs, setInputs] = useState<string[]>(
    new Array(property.inputs.length).fill(''),
  );

  const { refetch, error } = useContractRead({
    address,
    abi: typedAbi,
    functionName: property.name,
    enabled: false,
    args: inputs,
    onSuccess: (result) => {
      setOutputP(result);
    },
  });

  return (
    <Collapsable
      className="mb-2"
      key={property.name}
      reset={() => {
        setOutputP(null);
        setInputs(new Array(property.inputs.length).fill(''));
      }}
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
          onClick={() => refetch()}
        >
          Read
        </button>

        <hr className="border-t border-gray-200 my-2" />

        {outputP && <DisplayData data={outputP} />}
        {error && <div>{error.message}</div>}
      </div>
    </Collapsable>
  );
}

export function CallReader({
  selectedContract,
}: {
  selectedContract: ImportedContract;
}) {
  const { parsedAbi, typedAbi } = parseAbiStringToJson(selectedContract.abi);

  const properties = parsedAbi.filter(
    (f) =>
      f.inputs.length > 0 &&
      f.type === 'function' &&
      f.stateMutability &&
      f.stateMutability === 'view',
  );

  return (
    <>
      {properties.map((p, idx) => (
        <Call
          address={selectedContract.address as `0x${string}`}
          property={p}
          key={idx}
          typedAbi={typedAbi}
        />
      ))}
    </>
  );
}
