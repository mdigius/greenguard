
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Map, SearchComponent } from "./components";


export default function Home() {
  const router = useRouter();
  return (
    <main>
      <SearchComponent/>
      <Map />

    </main>
  );
}