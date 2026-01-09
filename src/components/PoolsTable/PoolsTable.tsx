"use client";

import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import { getChainFilters, type Pool } from "@/services/types";
import { formatPct, formatUsd } from "@/utils/formatters";

const columns: ColumnsType<Pool> = [
  {
    title: "Chain",
    dataIndex: "chain",
    key: "chain",
    render: (chain) => <Tag>{chain}</Tag>,
    filters: getChainFilters(),
    onFilter: (value, record) => record.chain === value,
  },
  {
    title: "Pair",
    key: "pair",
    render: (_, record) => `${record.token0}/${record.token1}`,
  },
  {
    title: "Fee tier",
    dataIndex: "feeTier",
    key: "feeTier",
    sorter: (a, b) => a.feeTier - b.feeTier,
  },
  {
    title: "TVL",
    dataIndex: "tvlUsd",
    key: "tvlUsd",
    align: "right",
    render: (v) => formatUsd(v),
    sorter: (a, b) => a.tvlUsd - b.tvlUsd,
  },
  {
    title: "Volume 24h",
    dataIndex: "volume24hUsd",
    key: "volume24hUsd",
    align: "right",
    render: (v) => formatUsd(v),
    sorter: (a, b) => a.volume24hUsd - b.volume24hUsd,
  },
  {
    title: "Fee APR (7d)",
    dataIndex: "feeApr7d",
    key: "feeApr7d",
    align: "right",
    render: (v) => formatPct(v),
    sorter: (a, b) => a.feeApr7d - b.feeApr7d,
  },
];

type PoolsTableProps = {
  data: Pool[];
};

export function PoolsTable({ data }: PoolsTableProps) {
  return (
    <Table
      rowKey={(r) => r.poolAddress}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
}
