export type ParsedAbi = {
  inputs: any[];
  name: string;
  outputs?: any[];
  stateMutability?: 'view' | 'pure' | 'nonpayable' | 'payable';
  anonymous?: boolean;
  type: 'function' | 'constructor' | 'event' | 'fallback';
};
