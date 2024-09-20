import { Button, Card, Group, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

export default function SQLite() {
  const [user, setUser] = useState<string>("Saulo Costa");
  const [data, setData] = useState<any>([]);

  const addUser = useCallback(async () => {
    const data = await global.api.sendSync("addUser", { name: user });

    if (data.error) {
      console.error(data.error);
      return;
    } else {
      setData(data.data);
    }
  }, [user]);

  return (
    <Group justify="center">
      <Group w={"100%"} p={20} pb={0}>
        <TextInput
          label="Name"
          className="border-2 rounded-md"
          type="text"
          name="user"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          w={"100%"}
          maw={400}
        />
      </Group>

      <Group w={"100%"} maw={400} p={20} pt={0}>
        <Button w={"100%"} variant="outline" onClick={() => addUser()}>
          Add
        </Button>
      </Group>

      <Group justify="center" p={20} w={"100%"}>
        <Card shadow="sm" p="md" withBorder w={"100%"} h={"100%"} radius={"md"}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Card>
      </Group>
    </Group>
  );
}
