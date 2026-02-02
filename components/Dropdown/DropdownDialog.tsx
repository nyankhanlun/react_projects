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

type Props = {
  songId : any
  onSelect: (menu: 'lyrics' | 'chordLyrics' | 'chord' | 'update') => void
}

export function DropdownMenuDialog({ onSelect, songId }: Props) {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-white" size="responsive" variant="outline" aria-label="Open menu">
            Choose Options  
            <TriangleDownIcon />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 md:w-47 lg:w-44 bg-white border-slate-100" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
           <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onSelect('lyrics')} className="hover:text-[#d8675e] hover:font-bold">
              Lyrics
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSelect('chord')} className="hover:text-[#d8675e] hover:font-bold">
              Chord
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSelect('chordLyrics')} className="hover:text-[#d8675e] hover:font-bold">
              Lyrics & Chord
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSelect('update')}>
              <Link href={`/songs/${songId}/edit`} className="text-[#ff8a05] font-bold">
              
              Edit Song
              </Link>
              
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
