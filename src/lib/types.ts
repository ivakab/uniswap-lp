export type Chain = "ethereum" | "base" | "arbitrum" | "polygon";

export type Dex = "uniswap-v3" | "uniswap-v2" | "sushiswap" | "pancakeswap";

export type Pool = {
  chain: Chain;
  dex: Dex;
  poolAddress: string;
  token0: string;
  token1: string;
  feeTier: number;
  tvlUsd: number;
  volume24hUsd: number;
  feeApr7d: number;
};

export const CHAINS: { label: string; value: Chain }[] = [
  { label: "Ethereum", value: "ethereum" },
  { label: "Base", value: "base" },
  { label: "Arbitrum", value: "arbitrum" },
  { label: "Polygon", value: "polygon" },
];

export function getChainFilters() {
  return CHAINS.map((c) => ({ text: c.label, value: c.value }));
}
