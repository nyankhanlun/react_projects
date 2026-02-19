'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NavLink from './NavLink';
import { DropdownHeaderMenuDialog } from '../Dropdown/DropdownHeaderDialog';
import { signOut } from 'firebase/auth';
import { clientAuth } from '@/lib/firebase-client';
import { useRouter } from "next/navigation";
import { useSetList } from '@/context/SetListContext';

export default function Header() {
    const { setList,currentUser } = useSetList()
    console.log("current user", currentUser)
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleLogout = async () => {
        try {
            await signOut(clientAuth);
            router.push("/login");
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    return (
        <header className="w-full">
            <div className="mx-auto max-w-7xl flex items-center justify-between py-3">
                {/* Logo here */}
                <Link href="" className="text-xl font-bold text-blue-600">
                    {/* ChordBank */}
                </Link>

                <nav className="hidden md:flex gap-6 text-md font-medium">

                    <button
                        type="button" onClick={handleLogout}
                        className="text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 shadow-sm font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none transition"
                    >
                        Logout
                    </button>
                    <NavLink href="/songs" >
                        Home
                    </NavLink>

                    {currentUser?.role === "admin" && (
                        <NavLink href="/songs/new" >
                            Add New Song
                        </NavLink>
                    )}

                        {/* <NavLink href="/songs/new" >
                            Add New Song
                        </NavLink> */}

                    <NavLink href="/setlist" >
                        Set List   ({setList.length})
                    </NavLink>

                </nav>

                <div className="md:hidden">
                    <DropdownHeaderMenuDialog handleLogout={handleLogout} setList={setList}>
                        <HamburgerMenuIcon className="w-6 h-6" />
                    </DropdownHeaderMenuDialog>
                </div>

            </div>

        </header>
    );
}
