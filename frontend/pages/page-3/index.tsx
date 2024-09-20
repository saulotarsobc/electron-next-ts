import { NotificationTest } from "@/components/NotificationTest/NotificationTest";
import { Group, Title } from "@mantine/core";

export default function Home() {
  return (
    <Group
      justify="center"
      align="start"
      w={"100%"}
      h={"calc(100vh - 60px)"}
      p={20}
    >
      <Group>
        <Title>Page 3</Title>
      </Group>
      <Group>
        <NotificationTest />
      </Group>
    </Group>
  );
}
