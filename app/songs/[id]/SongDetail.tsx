'use client'
import Link from 'next/link'
import classes from './page.module.css'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import {  useState } from 'react';
import { Song } from '@/app/types';
import { DropdownMenuDialog } from '@/components/Dropdown/DropdownDialog';
import LyricsViewer from '@/components/Details/LyricsViewer/lyrics';
import SongTransposer from '@/components/Details/ChordLyricsViewer/lyrics';
import SheetViewer from '@/components/Details/ChordSheetViewer/sheetView';
import dynamic from 'next/dynamic'


const SongForm = dynamic(() => import('../song-form'), {
    loading: () => <p>Loading form...</p>, // or your spinner component
    ssr: false, // optional but recommended if the form is client-only
})

export default function SongDetailClientPage({ song }: { song: Song }) {
    const [activeMenu, setActiveMenu] = useState<'lyrics' | 'chordLyrics' | 'update' | 'chord' | 'delete'>('lyrics')

    return (
        <>
            <div className="flex flex-col w-full gap-3">
                <div className="flex flex-row items-center gap-4 w-full">
                    <p className="text-2xl whitespace-nowrap text-[#1f5692] font-semibold">Song Detail (Lyrics & Chord)</p>
                </div>

                <div className="flex flex-row items-center gap-4 w-full my-3">
                    <Link href={`/songs`}>
                        <button className={classes.responsive_back_btn}>
                            <DoubleArrowLeftIcon />
                            <span className={classes.btn_text}>Back</span>
                        </button>
                    </Link>
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