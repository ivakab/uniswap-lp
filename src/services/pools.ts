import {
  calculateMetrics,
  fetchPoolDayDatas,
  fetchStablePools,
  groupByPool,
} from "@/services/uniswap/base";
import type { Pool } from "./types";

export async function getPools(): Promise<Pool[]> {
  const subgraphPools = await fetchStablePools({ first: 50, minTvl: 100_000 });

  if (subgraphPools.length === 0) {
    return [];
  }

  const poolIds = subgraphPools.map((p) => p.id);
  const dayDatas = await fetchPoolDayDatas(poolIds, { days: 7 });
  const dayDatasByPool = groupByPool(dayDatas);

  const pools: Pool[] = subgraphPools.map((subgraphPool) => {
    const poolDayDatas = dayDatasByPool.get(subgraphPool.id) ?? [];
    const metrics = calculateMetrics(subgraphPool, poolDayDatas);

    return {
      chain: "base",
      dex: "uniswap-v3",
      poolAddress: subgraphPool.id,
      token0: subgraphPool.token0.symbol,
      token1: subgraphPool.token1.symbol,
      feeTier: parseInt(subgraphPool.feeTier, 10),
      tvlUsd: metrics.tvlUsd,
      volume24hUsd: metrics.volume24hUsd,
      feeApr7d: metrics.feeApr7d,
    };
  });

  return pools;
}
