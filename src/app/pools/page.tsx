import { Card, Flex } from "antd";
import AntdLink from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Link from "next/link";

import { PageLayout } from "@/components/PageLayout";
import { PoolsTable } from "@/components/PoolsTable";
import { getPools } from "@/services/pools";

export default async function PoolsPage() {
  const pools = await getPools();

  return (
    <PageLayout>
      <Flex vertical gap={16}>
        <header>
          <Title level={2}>Stable pools (MVP)</Title>
          <Paragraph>
            Currently showing mock data. View raw JSON:{" "}
            <AntdLink href="/api/pools" target="_blank" rel="noreferrer">
              /api/pools
            </AntdLink>
            . Back to <Link href="/">home</Link>.
          </Paragraph>
        </header>

        <Card>
          <PoolsTable data={pools} />
        </Card>
      </Flex>
    </PageLayout>
  );
}
