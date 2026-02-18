'use client'
import Link from 'next/link'
import classes from './page.module.css'
import { DoubleArrowLeftIcon, StarFilledIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react';
import { Song } from '@/app/types';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth';
import { clientAuth } from '@/lib/firebase-client';
import { DropdownMenuDialog } from '@/components/Dropdown/DropdownDialog';
import dynamic from 'next/dynamic'

const LyricsViewer = dynamic(() => import('@/components/Details/LyricsViewer/lyrics'), { ssr: false })
const SongTransposer = dynamic(() => import('@/components/Details/ChordLyricsViewer/lyrics'), { ssr: false })
const SheetViewer = dynamic(() => import('@/components/Details/ChordSheetViewer/sheetView'), { ssr: false })

export default function SongDetailClientPage({ song }: { song: Song }) {
    const [activeMenu, setActiveMenu] = useState<'lyrics' | 'chordLyrics' | 'update' | 'chord' | 'delete'>('lyrics')
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(clientAuth, (user) => {
            if (!user) {
                router.push("/login");
            } else {
                // console.log("Logged in:", user);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);
    return (
        <>
            <div className="flex flex-col w-full gap-3">
                <div className="flex flex-row items-center gap-4 w-full">
                    <p className="text-1xl md:text-2xl whitespace-nowrap text-[#1f5692] font-semibold">Song Detail (Lyrics & Chord)</p>
                </div>

                <div className="flex flex-row items-center gap-4 w-full my-3">
                    <button
                        onClick={() => router.back()}
                        className={classes.responsive_back_btn}
                    >
                        <DoubleArrowLeftIcon />
                        <span className={classes.btn_text}>Back</span>
                    </button>
                    <div className="flex flex-row ml-auto">
                        <button
                            type="button"
                            className="w-full sm:w-auto
                                        mx-3 sm:mx-5
                                        inline-flex items-center justify-center
                                        bg-[#FFC300] hover:bg-[#FFEDC7]
                                        border border-transparent
                                        focus:ring-4 focus:ring-blue-300
                                        shadow-sm font-medium leading-5
                                        rounded-md
                                        text-sm sm:text-base
                                        px-2 sm:px-3
                                       py-0
                                        focus:outline-none 
                                        transition-all duration-200
                                    "
                        >
                            <StarFilledIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 -ml-0.5" />
                            Add to List
                        </button>

                        <DropdownMenuDialog onSelect={setActiveMenu} songId={song?.id} />
                    </div>
                </div>
                {activeMenu === 'lyrics' && <LyricsViewer song={song} />}
                {activeMenu === 'chordLyrics' && <SongTransposer song={song} />}
                {activeMenu === 'chord' && <SheetViewer song={song} />}
            </div>
        </>
    )
}