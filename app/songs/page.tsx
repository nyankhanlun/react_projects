import Header from "@/components/Header/header";
import {  getSongsCollectoin } from "../actions/songs";
import SongsList from "./song-list"; // client component

export const dynamic = 'force-dynamic'

export default async function SongsPage() {
  const list = await getSongsCollectoin()

  return (
    <main className="flex min-h-screen flex-col px-5 sm:px-10 py-5 bg-[#e1efff] sm:items-start">
      <div className="flex justify-end w-full text-right">
        <Header />
      </div>

      <SongsList list={list} />
    </main>
  );
}
