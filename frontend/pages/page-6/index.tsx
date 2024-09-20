import { Button, Card, Group, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useCallback, useState } from "react";

export default function SQLite() {
  const [user, setUser] = useState<string>("Saulo Costa");
  const [data, setData] = useState<any>([]);

  const addUser = useCallback(async () => {
    const notif = notifications.show({
      title: "Adding user",
      message: `Adding user ${user}...`,
      autoClose: false,
      loading: true,
    });

    setTimeout(async () => {
      const data = await global.api.sendSync("addUser", { name: user });

      if (data.eror) {
        console.error(data.error);

        notifications.update({
          id: notif,
          title: "Error",
          message: data.error || "Unknown error",
          autoClose: 3000,
          loading: false,
          icon: <IconCheck />,
          color: "red",
        });

        return;
      } else {
        setData(data.data);
        notifications.update({
          id: notif,
          title: "User added",
          message: `User ${user} added successfully!`,
          autoClose: 3000,
          loading: false,
          icon: <IconCheck />,
          color: "green",
        });
      }
    }, 1000);
  }, [user]);

  return (
    <Group justify="center" maw={500}>
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
        />
      </Group>

      <Group w={"100%"} p={20} pt={0}>
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
