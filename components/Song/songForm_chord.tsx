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
    const LABEL = ["C", "Cm", "Dm", "F", "Gm", "Am"];
    // const LABEL = ["C", "Cm", "D", "Dm", "E", "F", "Fm", "G", "Gm", "Ab", "A", "Am", "B"];
    const [selected, setSelected] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

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

    return (
        <>
            <form id="chord-form" onSubmit={handleSubmit}>
                <h3 className="mb-4 font-semibold text-heading">Chord Diagram</h3>
                {/* ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "Ab", "A", "A#", "B"] */}

                <ul className="grid grid-cols-4 gap-2 w-full select-none text-sm mb-6 font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg sm:grid-cols-6">
                    {LABEL.map((label: any) => (
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

                {(selected.length != 0 || preview) && (
                    <div className={classes.card}>
                        <div className={classes.container}>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
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
