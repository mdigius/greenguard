
"use client";
import  DisastersList  from "./components/List";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {SearchPage } from "./components";


export default function Home() {
  const router = useRouter();
  return (
    <main>
      <DisastersList></DisastersList>
    </main>
  );
}