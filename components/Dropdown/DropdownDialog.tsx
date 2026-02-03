"use client"

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
import { useState } from "react";

type MenuType = 'lyrics' | 'chordLyrics' | 'chord' | 'update'

type Props = {
  songId: any
  onSelect: (menu: MenuType) => void
}

export function DropdownMenuDialog({ onSelect, songId }: Props) {
  const [selected, setSelected] = useState<MenuType>("lyrics")
  const [loading, setLoading] = useState(false)

  const handleSelect = (menu: MenuType) => {
    setSelected(menu)
    onSelect(menu)
  }


  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-white" size="responsive" variant="outline" aria-label="Open menu">
            {selected === 'lyrics' && "Lyrics"}
            {selected === 'chordLyrics' && "Lyrics and Chord"}
            {selected === 'chord' && "Chord"}
            <TriangleDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 md:w-47 lg:w-44 bg-white border-slate-100" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleSelect("lyrics")} className="hover:text-[#d8675e] hover:font-bold">
              Lyrics
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect('chord')} className="hover:text-[#d8675e] hover:font-bold">
              Chord
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect('chordLyrics')} className="hover:text-[#d8675e] hover:font-bold">
              Lyrics & Chord
            </DropdownMenuItem>
            
            <DropdownMenuItem
              onClick={() => setLoading(true)}
            >
              <Link href={`/songs/${songId}/edit`} className="text-[#ff8a05] font-bold">
                {loading ? 'Opening...' : 'Edit Song'}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
