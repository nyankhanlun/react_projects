"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SongsList({ list }: { list: any[] }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); 

    return () => clearTimeout(timer);
  }, [search]);

  const filteredSongs = list.filter((song) =>
    `${song.title} ${song.composer}`
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-3">
        <div className="order-1 md:order-2 md:basis-1/2 md:flex md:items-center md:justify-end font-medium">
          <span className="text-[#d8675e] mx-3">
            Total - {filteredSongs.length}
          </span>
        </div>

        <div className="order-2 md:order-1 flex flex-row items-center gap-4 w-full md:basis-1/2">
          <p className="text-2xl whitespace-nowrap text-[#1f5692] font-semibold">
            All Songs
          </p>

          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 md:h-10 block w-full pr-10 pl-4 py-2 text-sm text-gray-900
                border border-black rounded-full bg-gray-50
                focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full pt-10">
        <ol className="list-decimal list-inside space-y-2 text-gray-800">
          {filteredSongs.map((song) => (
            <li key={song.id} className="hover:text-[#d8675e]">
              <Link href={`/songs/${song.id}`}>{song.title}</Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
