import { ImportedContract, useStore } from '@/app/store-provider';
import { useEffect, useState } from 'react';

export function FormContract({ close }: { close: () => void }) {
  const { addContract } = useStore();

  const [contract, setContract] = useState<ImportedContract>({
    name: '',
    address: '',
    abi: '',
    chainId: 0,
  });

  useEffect(() => {
    return () => {
      setContract({
        name: '',
        address: '',
        abi: '',
        chainId: 0,
      });
    };
  }, []);

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
      <label htmlFor="contract-name">Name</label>
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
        onChange={(e) =>
          setContract((oldState) => ({
            ...oldState,
            address: e.target.value,
          }))
        }
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
        className="rounded-md border text-white bg-black py-1 w-full"
      >
        Import
      </button>
    </form>
  );
}
