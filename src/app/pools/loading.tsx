import { Flex, Spin } from "antd";
import Title from "antd/es/typography/Title";

import { PageLayout } from "@/components/PageLayout";

export default function PoolsLoading() {
  return (
    <PageLayout>
      <Flex
        vertical
        gap={24}
        align="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <Spin size="large" />
        <Title level={4} style={{ margin: 0 }}>
          Loading pools...
        </Title>
      </Flex>
    </PageLayout>
  );
}
