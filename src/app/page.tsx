import { Button, Flex } from "antd";
import AntdLink from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Link from "next/link";

import { PageLayout } from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <Flex vertical gap={12}>
        <Title level={2}>Uniswap Stable Pools MVP</Title>

        <Paragraph>
          Go to pools table: <Link href="/pools">/pools</Link>
        </Paragraph>

        <Flex gap={8}>
          <Link href="/pools">
            <Button type="primary">Open pools</Button>
          </Link>
          <AntdLink href="/api/pools" target="_blank" rel="noreferrer">
            <Button>API JSON</Button>
          </AntdLink>
        </Flex>
      </Flex>
    </PageLayout>
  );
}
