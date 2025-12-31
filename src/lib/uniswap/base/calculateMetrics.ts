import type { SubgraphPool, SubgraphPoolDayData } from "./queries";

const DAYS_PER_YEAR = 365;
const SECONDS_PER_DAY = 86400;
const MIN_DAYS_FOR_APR = 5;

export type PoolMetrics = {
  tvlUsd: number;
  volume24hUsd: number;
  feeApr7d: number;
};

export function calculateMetrics(
  pool: SubgraphPool,
  dayDatas: SubgraphPoolDayData[],
): PoolMetrics {
  const tvlUsd = parseFloat(pool.totalValueLockedUSD);

  if (dayDatas.length === 0) {
    return { tvlUsd, volume24hUsd: 0, feeApr7d: 0 };
  }

  const volume24hUsd = parseFloat(dayDatas[0].volumeUSD);

  const newestDate = dayDatas[0].date;
  const oldestDate = dayDatas[dayDatas.length - 1].date;
  const actualDays = (newestDate - oldestDate) / SECONDS_PER_DAY + 1;

  if (actualDays < MIN_DAYS_FOR_APR) {
    return { tvlUsd, volume24hUsd, feeApr7d: 0 };
  }

  const totalFees = dayDatas.reduce((sum, d) => sum + parseFloat(d.feesUSD), 0);

  const avgTvl =
    dayDatas.reduce((sum, d) => sum + parseFloat(d.tvlUSD), 0) /
    dayDatas.length;

  const feeApr7d =
    avgTvl > 0 ? (totalFees / avgTvl) * (DAYS_PER_YEAR / actualDays) : 0;

  return { tvlUsd, volume24hUsd, feeApr7d };
}
