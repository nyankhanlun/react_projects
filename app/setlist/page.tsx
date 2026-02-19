"use client"

import Header from "@/components/Header/header"
import { useSetList } from "@/context/SetListContext"
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons"
import classes from './page.module.css'
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function SetListPage() {
  const { setList, removeFromSetList } = useSetList()
  const router = useRouter()
  return (

    <main className="flex min-h-screen flex-col px-5 sm:px-10 py-5 bg-[#e1efff] sm:items-start">
      <div className="flex justify-end w-full text-right">
        <Header />
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-row items-center gap-4 w-full">
          <p className="text-1xl md:text-2xl whitespace-nowrap text-[#1f5692] font-semibold">Selected Song List</p>
        </div>

        {/* <div className="flex flex-row items-center gap-4 w-full my-3">
                    <button
                        onClick={() => router.back()}
                        className={classes.responsive_back_btn}
                    >
                        <DoubleArrowLeftIcon />
                        <span className={classes.btn_text}>Back</span>
                    </button>
                </div> */}
      </div>
      <div className="p-5 w-full">

        {setList.length === 0 && <p>No songs added yet.</p>}

        {setList.map((song: any, idx: any) => (
          <div
            key={song.id}
            className="flex justify-between items-center border-b py-3 px-4 transition-colors hover:bg-gray-50 group"
          >
            <div className="flex-1">
              <Link href={`/songs/${song.id}`} className="block">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium ">{idx + 1}.</span>
                  <div>
                    <p className="font-medium  hover:underline">
                      {song.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {song.composer}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <button
              onClick={() => removeFromSetList(song.id)}
              className="ml-4 text-sm font-medium cursor-pointer text-red-500 "
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
