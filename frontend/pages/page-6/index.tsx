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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <input
          className="border-2 rounded-md"
          type="text"
          name="user"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <button className="border-2 px-4 rounded-md" onClick={() => addUser()}>
          Add
        </button>

        <br />

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </main>
  );
}
