'use client'
import { ReactNode, useEffect, useState } from 'react';
import classes from './card.module.css'
import { UploadIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Song } from '@/app/types';
import Compressor from 'compressorjs';

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ALLOWED_TYPES = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg"];

interface SongFormProps {
    onSubmit: (data: Record<string, any>) => void;
    song?: Song;
    children: ReactNode;
}

export default function SongForm_Chord({ song, onSubmit, children }: SongFormProps) {
    const LABEL_Dominant7_Chord = ["A7", "B7", "C7", "D7", "E7", "F7", "G7"];
    const LABEL_Major7_Chord = ["A Major 7", "B Major 7", "C Major 7", "D Major 7", "E Major 7", "F Major 7", "G Major 7"];
    const LABEL_Major_Chord = ["A", "B", "C", "D", "E", "F", "G"];
    const LABEL_Minor7_Chord = ["Am7", "Bm7", "Cm7", "Dm7", "Em7", "Fm7", "Gm7"];
    const LABEL_Minor_Chord = ["Am", "Bm", "Cm", "Dm", "Em", "Fm", "Gm"];
    

    const [selected, setSelected] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const [activeTab, setActiveTab] = useState("Dominant 7 Chord");

    useEffect(() => {
        if (song?.chord_sections) {
            setSelected(
                song.chord_sections.diagrams
            );
            setPreview(song.chord_sections.sheetImg)
        } else {
            setSelected([]);
        }
    }, [song]);

    const toggleCheckbox = (value: string) => {
        setSelected((prev: any) =>
            prev.includes(value)
                ? prev.filter((item: any) => item !== value) // remove
                : [...prev, value] // add
        );
    };
    const compressImage = (file: any): Promise<File> => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.7,
                maxWidth: 1920,
                maxHeight: 1080,
                success(compressedFile: File) {
                    resolve(compressedFile);
                },
                error(err: Error) {
                    reject(err);
                },
            });
        });
    }
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        // Validate file type
        if (!ALLOWED_TYPES.includes(selectedFile.type)) {
            setError("Only SVG, PNG, JPG files are allowed.");
            return;
        }

        // Validate file size
        if (selectedFile.size > MAX_FILE_SIZE) {
            setError("File size must be less than 20MB.");
            return;
        }
        const imgFile = await compressImage(selectedFile)
        setError("");
        setFile(imgFile);
        const base64 = await convertToBase64(imgFile);
        setPreview(base64);
    };

    const removeFile = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setFile(null);
        setPreview(null);
        setError("");
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file); // converts to base64

            reader.onload = () => {
                resolve(reader.result as string);
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const obj = {
            diagrams: selected,
            sheetImg: preview
        }
        onSubmit(obj)
    }
    const tabClass = (tab: any) =>
        `inline-block p-4 border-b-2 rounded-t-lg ${activeTab === tab
            ? "text-blue-600 border-blue-600"
            : "border-transparent hover:text-blue-600 hover:border-blue-600"
        }`;

    return (
        <>
            <form id="chord-form" onSubmit={handleSubmit}>
                <h3 className="mb-4 font-semibold text-heading">Chord Diagram</h3>
                <div className="mb-4 border-b border-gray-200">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                        {["Dominant 7 Chord", "Major 7 Chord", "Major Chord", "Minor 7 Chord", "Minor Chord"].map((tab) => (
                            <li key={tab} className="me-2">
                                <p
                                    className={tabClass(tab)}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {activeTab === "Dominant 7 Chord" && (
                    <ul className="grid grid-cols-4 gap-2 w-full select-none text-sm mb-6 font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg sm:grid-cols-7">
                        {LABEL_Dominant7_Chord.map((label: any) => (
                            <li key={label}>
                                <label className="flex items-center p-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(label)}
                                        onChange={() => toggleCheckbox(label)}
                                        className="w-4 h-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="ml-2">{label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
                {activeTab === "Major 7 Chord" && (
                    <ul className="grid grid-cols-4 gap-2 w-full select-none text-sm mb-6 font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg sm:grid-cols-7">
                        {LABEL_Major7_Chord.map((label: any) => (
                            <li key={label}>
                                <label className="flex items-center p-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(label)}
                                        onChange={() => toggleCheckbox(label)}
                                        className="w-4 h-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="ml-2">{label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
                {activeTab === "Major Chord" && (
                    <ul className="grid grid-cols-4 gap-2 w-full select-none text-sm mb-6 font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg sm:grid-cols-7">
                        {LABEL_Major_Chord.map((label: any) => (
                            <li key={label}>
                                <label className="flex items-center p-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(label)}
                                        onChange={() => toggleCheckbox(label)}
                                        className="w-4 h-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="ml-2">{label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
                {activeTab === "Minor 7 Chord" && (
                    <ul className="grid grid-cols-4 gap-2 w-full select-none text-sm mb-6 font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg sm:grid-cols-7">
                        {LABEL_Minor7_Chord.map((label: any) => (
                            <li key={label}>
                                <label className="flex items-center p-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(label)}
                                        onChange={() => toggleCheckbox(label)}
                                        className="w-4 h-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="ml-2">{label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
                {activeTab === "Minor Chord" && (
                    <ul className="grid grid-cols-4 gap-2 w-full select-none text-sm mb-6 font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg sm:grid-cols-7">
                        {LABEL_Minor_Chord.map((label: any) => (
                            <li key={label}>
                                <label className="flex items-center p-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(label)}
                                        onChange={() => toggleCheckbox(label)}
                                        className="w-4 h-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="ml-2">{label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                )}

                {(selected.length != 0 || preview) && (
                    <div className={classes.card}>
                        <div className={classes.container}>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                {selected.map((imgName, i) => (
                                    <div key={i} className={classes.imageWrapper}>
                                        <img src={`/chord_diagram/${imgName}.png`} className="w-full aspect-square object-cover rounded-lg" />
                                    </div>
                                ))}
                            </div>

                            {preview && (
                                <div className="relative">
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="mt-4 w-full object-contain border rounded"
                                    />

                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md transition"
                                    >
                                        <Cross1Icon />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!preview &&
                    <div className="flex items-center justify-center w-full mt-4 mb-10">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadIcon className="w-8 h-8 mb-4 text-gray-500" />
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-400">SVG, PNG, JPG (Max. File Size: 20MB)</p>
                            </div>
                            <input id="dropzone-file" type="file"
                                onChange={handleFileChange}
                                accept=".svg,.png,.jpg,.jpeg" className="hidden" />
                        </label>
                    </div>
                }
                {children}
            </form>
        </>
    )
}
