import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Header />

      <h1 className="bg-yellow-200 p-5 rounded-lg">PAGINA HOME</h1>
    </main>
  );
}
