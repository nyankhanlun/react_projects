'use client'
import { ReactNode, useEffect, useState } from 'react';
import cardClasses from './card.module.css'
import { Song } from '@/app/types';

type Section = {
    label: string;
    content: string;
};

type ChordWithLryicsSection = {
    key: string;
    music: string;
    chordLyricssection: Section[]
};

interface SongFormProps {
    onSubmit: (data: Record<string, any>) => void;
    song?: Song;
    children: ReactNode;
}

export default function SongForm_chordWithLyrics({ song, onSubmit, children }: SongFormProps) {
    const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "Ab", "A", "A#", "B"];
    const LABEL = ["Verse 1", "Verse 2", "Verse 3", "Verse 4", "Verse 5", "Verse 6", "PRE-Chorus", "Chorus", "Bridge", "End", "Intro", "Tab"];

    const [chordwithlyricssections, setChordwithlyricssections] =
        useState<ChordWithLryicsSection[]>([]);
    useEffect(() => {
        if (song?.key_sections?.length) {
            setChordwithlyricssections(
                song.key_sections.map((ks) => ({
                    key: ks.key ?? "C",
                    music: ks.music ?? "",
                    chordLyricssection:
                        ks.chordLyricssection?.map((s) => ({
                            label: s.label ?? "",
                            content: s.content ?? "",
                        })) ?? [{ label: "", content: "" }],
                }))
            );
        } else {
            // create page fallback
            setChordwithlyricssections([
                {
                    key: "C",
                    music: "",
                    chordLyricssection: [{ label: "", content: "" }],
                },
            ]);
        }
    }, [song]);


    const addSection = (chordIndex: number) => {
        setChordwithlyricssections(prev =>
            prev.map((c, i) =>
                i === chordIndex
                    ? {
                        ...c,
                        chordLyricssection: [
                            ...c.chordLyricssection,
                            { label: "", content: "" },
                        ],
                    }
                    : c
            )
        );
    };

    const updateSection = (
        chordIndex: number,
        sectionIndex: number,
        field: keyof Section,
        value: string
    ) => {
        setChordwithlyricssections(prev =>
            prev.map((c, i) =>
                i === chordIndex
                    ? {
                        ...c,
                        chordLyricssection: c.chordLyricssection.map((s, j) =>
                            j === sectionIndex ? { ...s, [field]: value } : s
                        ),
                    }
                    : c
            )
        );
    };

    const removeSection = (chordIndex: number, sectionIndex: number) => {
        setChordwithlyricssections(prev =>
            prev.map((c, i) =>
                i === chordIndex
                    ? {
                        ...c,
                        chordLyricssection:
                            c.chordLyricssection.length === 1
                                ? c.chordLyricssection
                                : c.chordLyricssection.filter((_, j) => j !== sectionIndex),
                    }
                    : c
            )
        );
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(chordwithlyricssections)
    }

    const addChordWithLryicsSection = (): void => {
        setChordwithlyricssections(prev => [
            ...prev,
            {
                key: "C",
                music: "",
                chordLyricssection: [{ label: "", content: "" }],
            },
        ]);
    };


    return (
        <>
            <form id="lyrics-form" onSubmit={handleSubmit} >
                {chordwithlyricssections.map((chordsection, chordindex) => (
                    <div key={chordindex} className={`${cardClasses.card} bg-[#F6CE71] my-5`}>
                        <div className={cardClasses.container}>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="mKey" className="font-medium mb-1">
                                        Key
                                    </label>
                                    <select
                                        className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={chordsection.key}
                                        onChange={(e) =>
                                            setChordwithlyricssections(prev =>
                                                prev.map((c, i) =>
                                                    i === chordindex ? { ...c, key: e.target.value } : c
                                                )
                                            )
                                        }
                                    >

                                        {NOTES.map(k => (
                                            <option key={k} value={k}>{k}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="music" className="font-medium mb-1">
                                        Music
                                    </label>
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={chordsection.music}
                                        onChange={(e) =>
                                            setChordwithlyricssections(prev =>
                                                prev.map((c, i) =>
                                                    i === chordindex ? { ...c, music: e.target.value } : c
                                                )
                                            )
                                        }
                                    />

                                </div>
                            </div>
                            <div className="space-y-6 mt-3">
                                {chordsection.chordLyricssection.map((section, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#F6F6F6] border p-4 rounded space-y-4"
                                    >
                                        <div className="flex items-center justify-between gap-4">

                                            <div className="flex flex-col w-full max-w-xs">
                                                <label className="font-medium mb-1">Label</label>
                                                <select
                                                    value={section.label}
                                                    onChange={(e) =>
                                                        updateSection(chordindex, index, "label", e.target.value)
                                                    }
                                                    className="h-14 px-4 text-lg border rounded bg-white focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">Select label</option>
                                                    {LABEL.map((k) => (
                                                        <option key={k} value={k}>
                                                            {k}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeSection(chordindex, index)}
                                                disabled={chordsection.chordLyricssection.length === 1}
                                                className="self-end 
                                                h-10
                                                px-4
                                                border
                                                rounded
                                                text-red-600
                                                hover:bg-red-50
                                                disabled:opacity-40
                                                disabled:cursor-not-allowed
                                                whitespace-nowrap"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-medium mb-1">Content</label>
                                            {section.content && (
                                                <>
                                                    <pre className="whitespace-pre-wrap 
                                                            text-sm md:text-base
                                                            leading-relaxed
                                                            bg-gray-800
                                                           p-3 sm:p-6
                                                            rounded
                                                            overflow-x-auto
                                                            text-[#ffffff]
                                                        ">
                                                            <p className='text-[#ffcc00] font-bold'>Preview</p>
                                                        {section.content}
                                                    </pre>
                                                </>

                                            )
                                            }
                                            <textarea
                                                value={section.content}
                                                onChange={(e) =>
                                                    updateSection(chordindex, index, "content", e.target.value)
                                                }
                                                className="mt-3 px-4 py-3 text-lg min-h-[160px] border rounded resize-y focus:ring-2 focus:ring-blue-500 bg-white"
                                            />

                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addSection(chordindex)}
                                    className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    <span className="text-xl font-bold">+</span>
                                    Add New Label
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addChordWithLryicsSection}
                    className="flex items-center gap-2 px-4 py-2 my-4 border-2 border-[#F6CE71] rounded hover:bg-[#F6CE71]"
                >
                    <span className="text-xl font-bold ">+</span>
                    Add New Key
                </button>
                {children}
            </form>

        </>
    )
}
