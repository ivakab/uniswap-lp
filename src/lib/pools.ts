import type { Pool } from "./types";

export const mockPools: Pool[] = [
  {
    chain: "ethereum",
    dex: "uniswap-v3",
    poolAddress: "0x1111111111111111111111111111111111111111",
    token0: "USDC",
    token1: "USDT",
    feeTier: 100,
    tvlUsd: 42_000_000,
    volume24hUsd: 18_500_000,
    feeApr7d: 0.032,
  },
  {
    chain: "base",
    dex: "uniswap-v3",
    poolAddress: "0x2222222222222222222222222222222222222222",
    token0: "USDC",
    token1: "DAI",
    feeTier: 500,
    tvlUsd: 12_800_000,
    volume24hUsd: 6_200_000,
    feeApr7d: 0.041,
  },
];

export async function getPools(): Promise<Pool[]> {
  return mockPools;
}
