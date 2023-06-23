import { formatEther } from 'viem';
import { clamp } from './clamp';

const weiPerEther = 1000000000000000000n;

export function toStringFormat(v: any) {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';

  return v.toString();
}

export function toFormat(v: any) {
  if (typeof v === 'bigint' && v > weiPerEther) {
    return (
      <span>
        <span className="hover:underline cursor-pointer">
          {formatEther(v).replace(/\.0+$/, '')}
        </span>{' '}
        <span className="text-xs text-gray-500">
          × 10<sup>18</sup>
        </span>
      </span>
    );
  }

  if (typeof v === 'string' && v.startsWith('0x')) {
    return (
      <span className="hover:underline cursor-pointer">{clamp(v, 12)}</span>
    );
  }

  return (
    <span className="hover:underline cursor-pointer">{toStringFormat(v)}</span>
  );
}
