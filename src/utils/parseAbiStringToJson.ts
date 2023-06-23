import { ParsedAbi } from '@/types/parsedAbi';
import { Abi } from 'viem';

export function parseAbiStringToJson(abi: string): {
  parsedAbi: ParsedAbi[];
  typedAbi: Abi;
} {
  try {
    const parsed = JSON.parse(abi);
    return { parsedAbi: parsed, typedAbi: parsed };
  } catch (e) {
    console.error(e);
    return { parsedAbi: [], typedAbi: [] };
  }
}
