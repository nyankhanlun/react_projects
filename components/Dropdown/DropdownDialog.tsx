"use client"

import { deleteSongById, songById } from "@/app/actions/songs";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  TriangleDownIcon
} from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";

type MenuType = 'lyrics' | 'chordLyrics' | 'chord' | 'update' | 'delete'

type Props = {
  songId: any
  onSelect: (menu: MenuType) => void
}

export function DropdownMenuDialog({ onSelect, songId }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<MenuType>("lyrics")
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleSelect = async (menu: MenuType) => {
    setSelected(menu)
    onSelect(menu)
  }

  const deleteSongByID = async () => {
    if (!confirm('Are you sure you want to delete this song?')) return;
    try {
      setDeleteLoading(true)
      await deleteSongById(songId);
    } catch (error) {
      setDeleteLoading(false)
      console.error("Error deleting song:", error);
    }
  };

  const updateSongByID = () => {
    setLoading(true)
    router.push(`/songs/${songId}/edit`);
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-white" size="responsive" variant="outline" aria-label="Open menu">
            {selected === 'lyrics' && "Lyrics"}
            {selected === 'chordLyrics' && "Lyrics & Chord"}
            {selected === 'chord' && "Chord Sheet Only"}
            <TriangleDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 md:w-47 lg:w-44 bg-white border-slate-100" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>

            <DropdownMenuItem disabled={loading} onClick={() => handleSelect("lyrics")} className="hover:text-[#d8675e] hover:font-bold">
              Lyrics
            </DropdownMenuItem>
            <DropdownMenuItem disabled={loading} onClick={() => handleSelect('chordLyrics')} className="hover:text-[#d8675e] hover:font-bold">
              Lyrics & Chord
            </DropdownMenuItem>
            <DropdownMenuItem disabled={loading} onClick={() => handleSelect('chord')} className="hover:text-[#d8675e] hover:font-bold">
              Chord Sheet Only
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-200 h-[2px]" />

            <DropdownMenuItem
              onClick={() => updateSongByID()}
            >
              <Link href='' className="text-[#ff8a05] font-bold">
                {loading ? 'Loading...' : 'Edit Song'}
              </Link>

            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => deleteSongByID()}
            >
              <Link href='' className="text-[#b00000] font-bold">
                {deleteLoading ? 'Loading...' : 'Delete Song'}
              </Link>
            </DropdownMenuItem>

          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
