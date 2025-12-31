import { graphqlQuery } from "./client";
import {
  POOL_DAY_DATAS_QUERY,
  type PoolDayDatasQueryResponse,
  type SubgraphPoolDayData,
} from "./queries";

const SECONDS_PER_DAY = 86400;
const MAX_FIRST = 1000;

function getStartOfDayUTC(): number {
  const now = Math.floor(Date.now() / 1000);
  return now - (now % SECONDS_PER_DAY);
}

export type FetchPoolDayDatasOptions = {
  days?: number;
};

export async function fetchPoolDayDatas(
  poolIds: string[],
  options: FetchPoolDayDatasOptions = {},
): Promise<SubgraphPoolDayData[]> {
  const { days = 7 } = options;

  if (poolIds.length === 0) {
    return [];
  }

  const todayStart = getStartOfDayUTC();
  const dateGt = todayStart - days * SECONDS_PER_DAY;

  const expectedRecords = poolIds.length * days;
  const first = Math.min(MAX_FIRST, expectedRecords);

  const data = await graphqlQuery<PoolDayDatasQueryResponse>(
    POOL_DAY_DATAS_QUERY,
    {
      pools: poolIds,
      dateGt,
      first,
    },
  );

  return data.poolDayDatas;
}

export type PoolDayDatasByPool = Map<string, SubgraphPoolDayData[]>;

export function groupByPool(
  dayDatas: SubgraphPoolDayData[],
): PoolDayDatasByPool {
  const map = new Map<string, SubgraphPoolDayData[]>();

  for (const dayData of dayDatas) {
    const poolId = dayData.pool.id;
    const arr = map.get(poolId);
    if (arr) arr.push(dayData);
    else map.set(poolId, [dayData]);
  }

  for (const arr of map.values()) {
    arr.sort((a, b) => b.date - a.date);
  }

  return map;
}
