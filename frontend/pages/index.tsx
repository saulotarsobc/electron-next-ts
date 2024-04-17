import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [Users, setUsers] = useState([]);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Header />

      <h1 className="bg-yellow-200 p-5 rounded-lg">PAGINA HOME</h1>

      <h2>Integração com Sequelize</h2>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          const data = await global.api.db.createUser({
            firstName: "Saulo",
            lastName: "Costa",
          });
          setUsers(data);
        }}
      >
        Criar user
      </button>

      <hr />
      <pre className="bg-slate-500">{JSON.stringify(Users, null, 4)}</pre>
      <hr />
    </main>
  );
}
