import { BigNumber, constants, utils } from 'ethers';
import { clamp } from './clamp';

export function toStringFormat(v: any) {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';

  return v.toString();
}

export function numberWithCommas(s: string) {
  const parts = s.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  parts[1] = parts[1].substring(0, 2);
  return parts.join('.');
}

export function toFormat(v: any) {
  if (v instanceof BigNumber) {
    if (v.gte(constants.WeiPerEther)) {
      return (
        <span>
          <span className="hover:underline cursor-pointer">
            {numberWithCommas(utils.formatEther(v)).replace(/\.0+$/, '')}
          </span>{' '}
          <span className="text-xs text-gray-500">
            × 10<sup>18</sup>
          </span>
        </span>
      );
    }
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
