export type Stablecoin = {
  symbol: string;
  address: string;
  decimals: number;
};

export const BASE_STABLECOINS: Stablecoin[] = [
  {
    symbol: "USDC",
    address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    decimals: 6,
  },
  {
    symbol: "USDbC",
    address: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    decimals: 6,
  },
  {
    symbol: "DAI",
    address: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
    decimals: 18,
  },
  {
    symbol: "USDT",
    address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
    decimals: 6,
  },
];

export const BASE_STABLECOIN_ADDRESSES = new Set(
  BASE_STABLECOINS.map((s) => s.address),
);

export const BASE_STABLECOIN_SYMBOLS = new Map(
  BASE_STABLECOINS.map((s) => [s.address, s.symbol]),
);

export function isStablecoin(address: string): boolean {
  return BASE_STABLECOIN_ADDRESSES.has(address.toLowerCase());
}

export function isStablePair(token0: string, token1: string): boolean {
  return isStablecoin(token0) && isStablecoin(token1);
}

export function getTokenSymbol(address: string): string {
  return BASE_STABLECOIN_SYMBOLS.get(address.toLowerCase()) ?? "UNKNOWN";
}
