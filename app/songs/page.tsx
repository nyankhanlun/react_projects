import Header from "@/components/Header/header";
import Link from "next/link";
import { getSongs } from "../actions/songs";
import SongsList from "./song-list"; // client component

export default async function SongsPage() {
  const list = await getSongs();

  return (
    <main className="flex min-h-screen flex-col px-5 sm:px-10 py-5 bg-[#e1efff] dark:bg-black sm:items-start">
      <div className="flex justify-end w-full text-right">
        <Header />
      </div>

      <SongsList list={list} />
    </main>
  );
}
