import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />

      <h1 className="bg-green-200 p-5 rounded-lg">PAGINA 2</h1>
    </main>
  );
}
