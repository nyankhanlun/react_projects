'use client'
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Song } from '@/app/types';

type Section = {
    label: string;
    content: string;
};


interface SongFormProps {
    onSubmit: (data: Record<string, any>) => void;
    song?: Song;
    children: ReactNode
}

export default function SongForm_Lyrics({ song, onSubmit, children }: SongFormProps) {
    const LABEL = ["Verse 1", "Verse 2", "Verse 3", "Verse 4", "Verse 5", "Verse 6", "PRE-Chorus", "Chorus", "Bridge", "End", "Intro", "Tab"];
    const [toKey, setToKey] = useState("C");
    const [sections, setSections] = useState<Section[]>([]);

    const prevKeyRef = useRef<string>(toKey);
    useEffect(() => {
        if (song?.text_sections?.length) {
            setSections(
                song.text_sections.map((s : any) => ({
                    label: s.label ?? "",
                    content: s.content ?? "",
                }))
            );
        } else {
            // create page fallback
            setSections([{ label: "", content: "" }]);
        }
    }, [song]);

    useEffect(() => {
        if (
            prevKeyRef.current !== toKey &&
            sections[sections.length - 1]?.content.trim() !== ""
        ) {

            // Key changed → add new section
            setSections((prev) => [
                // ...prev,
                { label: "", content: "" },
            ]);

            prevKeyRef.current = toKey;
        }
    }, [toKey]);

    const addSection = (): void => {
        setSections((prev) => [
            ...prev,
            { label: "", content: "" },
        ]);
    };

    const updateSection = (
        index: number,
        field: keyof Section,
        value: string
    ): void => {
        setSections((prev) =>
            prev.map((section : any, i : any) =>
                i === index ? { ...section, [field]: value } : section
            )
        );
    };

    const removeSection = (index: number): void => {
        setSections((prev) =>
            prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
        );
    };


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(sections);
    }

    return (
        <>
            <form id="lyrics-form" onSubmit={handleSubmit}>
                <div className="space-y-6">

                    {sections.map((section : any, index : any) => (
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
                                            updateSection(index, "label", e.target.value)
                                        }
                                        className="h-14 px-4 text-lg border rounded bg-white focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select label</option>
                                        {LABEL.map((k : any) => (
                                            <option key={k} value={k}>
                                                {k}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeSection(index)}
                                    disabled={sections.length === 1}
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
                                <textarea
                                    value={section.content}
                                    onChange={(e) =>
                                        updateSection(index, "content", e.target.value)
                                    }
                                    className="px-4 py-3 text-lg min-h-[160px] border rounded resize-y focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSection}
                        className="flex items-center gap-2 px-4 py-2 border rounded bg-[#A9A9A9] hover:bg-[#F5F5F0]"
                    >
                        <span className="text-xl font-bold">+</span>
                        Add New Label
                    </button>
                </div>

                {children}
            </form>


        </>
    )
}
