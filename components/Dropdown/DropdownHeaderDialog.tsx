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
  // currentUser: any,
  setList: any,
  children: React.ReactNode;
  handleLogout: () => Promise<void>;
};

export function DropdownHeaderMenuDialog({
  // currentUser,
  setList,
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
            <Link href="/songs">Home</Link>
          </DropdownMenuItem>

          {/* {currentUser.role === 'admin' && 
          <DropdownMenuItem asChild>
            <Link href="/songs/new">Add New Song</Link>
          </DropdownMenuItem>
          } */}

          <DropdownMenuItem asChild>
            <Link href="/songs/new">Add New Song</Link>
          </DropdownMenuItem>
          

          <DropdownMenuItem asChild>
            <Link href="/setlist">
             Set List   ({setList.length})
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-slate-200 h-[2px]" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-[#b00000] font-medium"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </DropdownMenuItem>

        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
