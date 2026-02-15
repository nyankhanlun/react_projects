'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NavLink from './NavLink';
import { logoutUser } from '@/app/actions/users_route';
import { DropdownHeaderMenuDialog } from '../Dropdown/DropdownHeaderDialog';

export default function Header() {
    const [open, setOpen] = useState(false);

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


    return (
        <header className="w-full">
            <div className="mx-auto max-w-7xl flex items-center justify-between py-3">
                {/* Logo here */}
                <Link href="" className="text-xl font-bold text-blue-600">
                    {/* ChordBank */}
                </Link>

                <nav className="hidden md:flex gap-6 text-md font-medium">
                    <NavLink href="/songs" >
                        All Songs
                    </NavLink>
                    {/* <NavLink href="/artist" >
                        Artist
                    </NavLink> */}
                    <NavLink href="/songs/new" >
                        Add New Song
                    </NavLink>

                    {/* <button
                        type="button" onClick={logoutUser}
                        className="text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 shadow-sm font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none transition"
                    >
                        Logout
                    </button> */}
                </nav>

                <div className="md:hidden">
                    <DropdownHeaderMenuDialog>
                        <HamburgerMenuIcon className="w-6 h-6" />
                    </DropdownHeaderMenuDialog>
                </div>

            </div>

        </header>
    );
}
