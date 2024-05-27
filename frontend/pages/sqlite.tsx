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
    <main>
      <input
        type="text"
        name="user"
        id="user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <button onClick={() => addUser()}>Add</button>

      <hr />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
