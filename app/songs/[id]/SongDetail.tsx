'use client'
import Link from 'next/link'
import classes from './page.module.css'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react';
import { Song } from '@/app/types';
import { DropdownMenuDialog } from '@/components/Dropdown/DropdownDialog';
import LyricsViewer from '@/components/Details/LyricsViewer/lyrics';
import SongTransposer from '@/components/Details/ChordLyricsViewer/lyrics';
import SheetViewer from '@/components/Details/ChordSheetViewer/sheetView';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth';
import { clientAuth } from '@/lib/firebase-client';

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
                    <div className="ml-auto">
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