export const STABLE_POOLS_QUERY = `
  query StablePools($stablecoins: [String!]!, $first: Int!, $minTvl: BigDecimal!) {
    pools(
      first: $first
      orderBy: totalValueLockedUSD
      orderDirection: desc
      where: {
        token0_in: $stablecoins
        token1_in: $stablecoins
        totalValueLockedUSD_gt: $minTvl
      }
    ) {
      id
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      feeTier
      totalValueLockedUSD
    }
  }
`;

export type SubgraphToken = {
  id: string;
  symbol: string;
};

export type SubgraphPool = {
  id: string;
  token0: SubgraphToken;
  token1: SubgraphToken;
  feeTier: string;
  totalValueLockedUSD: string;
};

export type StablePoolsQueryResponse = {
  pools: SubgraphPool[];
};

export const POOL_DAY_DATAS_QUERY = `
  query PoolDayDatas($pools: [String!]!, $dateGt: Int!, $first: Int!) {
    poolDayDatas(
      first: $first
      orderBy: date
      orderDirection: desc
      where: {
        pool_in: $pools
        date_gt: $dateGt
      }
    ) {
      id
      date
      pool {
        id
      }
      volumeUSD
      feesUSD
      tvlUSD
    }
  }
`;

export type SubgraphPoolDayData = {
  id: string;
  date: number;
  pool: { id: string };
  volumeUSD: string;
  feesUSD: string;
  tvlUSD: string;
};

export type PoolDayDatasQueryResponse = {
  poolDayDatas: SubgraphPoolDayData[];
};
