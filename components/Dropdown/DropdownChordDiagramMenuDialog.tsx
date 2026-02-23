"use client"

import { deleteSongById, songById } from "@/app/actions/songs";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  TriangleDownIcon
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type MenuType = 'Dominant 7 Chord' | 'Major 7 Chord' | 'Major Chord' | 'Minor 7 Chord' | 'Minor Chord'| 'Sharp Flat Major Chord'| 'Sharp Flat Minor Chord'

type Props = {
  onSelect: (menu: MenuType) => void
}

export function DropdownChordDiagramMenuDialog({ onSelect }: Props) {

  const router = useRouter();
  const [selected, setSelected] = useState<MenuType>("Dominant 7 Chord")

  const handleSelect = async (menu: MenuType) => {
    setSelected(menu)
    onSelect(menu)
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-white" size="responsive" variant="outline" aria-label="Open menu">
            {selected}
            <TriangleDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50 lg:w-44 bg-gray-100 border-slate-100" align="end">
          <DropdownMenuSeparator />
          <DropdownMenuGroup>

            <DropdownMenuItem onClick={() => handleSelect("Dominant 7 Chord")}  className="hover:text-[#d8675e] hover:font-bold">
              Dominant 7 Chord
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Major 7 Chord")} className="hover:text-[#d8675e] hover:font-bold">
              Major 7 Chord
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Major Chord")} className="hover:text-[#d8675e] hover:font-bold">
              Major Chord
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Minor 7 Chord")} className="hover:text-[#d8675e] hover:font-bold">
              Minor 7 Chord
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Minor Chord")} className="hover:text-[#d8675e] hover:font-bold">
              Minor Chord
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Sharp Flat Major Chord")} className="hover:text-[#d8675e] hover:font-bold">
              Sharp Flat Major Chord
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Sharp Flat Minor Chord")} className="hover:text-[#d8675e] hover:font-bold">
              Sharp Flat Minor Chord
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
