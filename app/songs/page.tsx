import Header from "@/components/Header/header";
import {  getSongsCollectoin } from "../actions/songs";
import dynamic from 'next/dynamic'

export const dynamic_force = 'force-dynamic'

const SongsList = dynamic(() => import('./song-list'))
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
