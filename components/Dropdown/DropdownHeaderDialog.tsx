"use client"

import Link from "next/link"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type DropdownHeaderMenuDialogProps = {
  children: React.ReactNode;
  handleLogout: () => void; // or () => Promise<void>
};

export function DropdownHeaderMenuDialog({
  children,
  handleLogout,
}: DropdownHeaderMenuDialogProps) {
  const [loading, setLoading] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          {children}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44 bg-white">

        <DropdownMenuGroup>

          <DropdownMenuItem asChild>
            <Link href="/songs">All Songs</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/songs/new">Add New Song</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-slate-200 h-[2px]" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 font-medium"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </DropdownMenuItem>

        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
