'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NavLink from './NavLink';

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
                {/* Logo */}
                <Link href="" className="text-xl font-bold text-blue-600 dark:text-white">
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
                </nav>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                    aria-label="Toggle menu"
                >
                    <HamburgerMenuIcon className="w-7 h-7 font-bold" />
                </button>
            </div>

            {open && (
                <div
                    ref={menuRef}
                    className="md:hidden absolute right-5 top-18 z-50 w-60 rounded-md bg-white dark:bg-gray-900 shadow-xl border-gray-800 dark:border-gray-800">
                    <nav className="flex flex-col divide-y dark:divide-gray-700">
                        <NavLink href="/songs">
                            All Songs
                        </NavLink>
                        <NavLink href="/songs/new">
                            Add New Song
                        </NavLink>
                    </nav>
                </div>
            )}
        </header>
    );
}
