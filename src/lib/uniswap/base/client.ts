import "server-only";

export type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

function getGraphUrl(): string {
  const apiKey = process.env.THEGRAPH_API_KEY;
  const subgraphId = process.env.UNISWAP_V3_BASE_SUBGRAPH_ID;

  if (!apiKey) {
    throw new Error("Missing THEGRAPH_API_KEY environment variable");
  }

  if (!subgraphId) {
    throw new Error("Missing UNISWAP_V3_BASE_SUBGRAPH_ID environment variable");
  }

  return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/${subgraphId}`;
}

export async function graphqlQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(getGraphUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GraphQL request failed: ${response.status} ${text}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors?.length) {
    throw new Error(
      `GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`,
    );
  }

  if (!json.data) {
    throw new Error("GraphQL response missing data");
  }

  return json.data;
}
