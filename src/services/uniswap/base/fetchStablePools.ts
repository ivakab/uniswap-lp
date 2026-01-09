import { BASE_STABLECOINS } from "@/services/config/stablecoins";
import { graphqlQuery } from "./client";
import {
  STABLE_POOLS_QUERY,
  type StablePoolsQueryResponse,
  type SubgraphPool,
} from "./queries";

const STABLECOIN_ADDRESSES = BASE_STABLECOINS.map((s) => s.address);

export type FetchStablePoolsOptions = {
  first?: number;
  minTvl?: number;
};

export async function fetchStablePools(
  options: FetchStablePoolsOptions = {},
): Promise<SubgraphPool[]> {
  const { first = 50, minTvl = 10_000 } = options;

  const data = await graphqlQuery<StablePoolsQueryResponse>(
    STABLE_POOLS_QUERY,
    {
      stablecoins: STABLECOIN_ADDRESSES,
      first,
      minTvl: minTvl.toString(),
    },
  );

  return data.pools;
}
