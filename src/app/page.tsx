
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Map, SearchComponent, SearchPage } from "./components";


export default function Home() {
  const router = useRouter();
  return (
    <main>
      <SearchPage></SearchPage>

    </main>
  );
}