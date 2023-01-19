import { ImportedContract, useStore } from '@/app/store-provider';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import { utils } from 'ethers';

export function FormContract({ close }: { close: () => void }) {
  const { addContract } = useStore();
  const { chain } = useNetwork();

  const [errorAddress, setErrorAddress] = useState<boolean>(false);
  const [contract, setContract] = useState<ImportedContract>({
    name: '',
    address: '',
    abi: '',
    chainId: 0,
  });

  useEffect(() => {
    if (chain) {
      setContract((oldState) => ({
        ...oldState,
        chainId: chain.id,
      }));
    }

    return () => {
      setContract({
        name: '',
        address: '',
        abi: '',
        chainId: 0,
      });
    };
  }, [chain]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addContract(contract);
    close();
  }

  return (
    <form
      className="rounded-md border border-black p-2"
      onSubmit={handleSubmit}
    >
      <label htmlFor="contract-name">Name (optional)</label>
      <input
        id="contract-name"
        type="text"
        placeholder="Contract name"
        className="border border-gray rounded-md p-1"
        value={contract.name}
        onChange={(e) =>
          setContract((oldState) => ({ ...oldState, name: e.target.value }))
        }
      />
      <label htmlFor="contract-address">Address</label>
      <input
        id="contract-address"
        type="text"
        placeholder="Address"
        className="border border-gray rounded-md p-1"
        value={contract.address}
        onChange={(e) => {
          setErrorAddress(false);

          setContract((oldState) => ({
            ...oldState,
            address: e.target.value,
          }));

          // * we verify the address of the contract that's being imported
          if (!utils.isAddress(e.target.value)) setErrorAddress(true);
        }}
      />
      <label htmlFor="contract-abi">Contract ABI</label>
      <textarea
        id="contract-abi"
        name="contract-abi"
        rows={4}
        cols={20}
        value={contract.abi}
        onChange={(e) =>
          setContract((oldState) => ({
            ...oldState,
            abi: e.target.value,
          }))
        }
      />
      <button
        type="submit"
        className={`rounded-md border text-white  py-1 w-full ${
          errorAddress ||
          contract.abi.length < 30 ||
          contract.abi.length === 0 ||
          contract.address.length === 0
            ? 'bg-gray-400'
            : 'bg-black'
        } `}
        disabled={
          errorAddress ||
          contract.abi.length < 30 ||
          contract.abi.length === 0 ||
          contract.address.length === 0
        }
      >
        Import
      </button>
    </form>
  );
}
