'use client';

import {
    TransformWrapper,
    TransformComponent,
} from 'react-zoom-pan-pinch';
import classes from './sheetView.module.css'
import { Song } from '@/app/types';
import { useEffect, useState } from 'react';

export default function SheetViewer({ song }: { song: Song }) {
    const [selected, setSelected] = useState<string[]>([]);
    useEffect(() => {
        if (song?.chord_sections) {
            setSelected(
                song.chord_sections.diagrams
            );
        } else {
            setSelected([]);
        }
    }, [song]);
    return (
        <div className="relative w-full">
            {selected.length != 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-5">
                    {selected.map((imgName, i) => (
                        <div key={i} className={classes.imageWrapper}>
                            <img src={`/chord_diagram/${imgName}.png`} className="w-full aspect-square object-cover rounded-lg" />
                        </div>
                    ))}
                </div>
            )}
            <img src={song?.chord_sections?.sheetImg} className="h-auto w-full select-none" />
        </div>
    );
}
