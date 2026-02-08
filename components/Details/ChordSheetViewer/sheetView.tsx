'use client';

import { Song } from '@/app/types';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

    const ref = useRef<HTMLDivElement | null>(null);

    const handleDownloadPdf = async () => {
        if (!ref.current) return;
        const element = ref.current;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            scrollY: -window.scrollY,
            windowHeight: element.scrollHeight,
            height: element.scrollHeight,
        });

        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const totalImgHeightInMm = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = totalImgHeightInMm;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, totalImgHeightInMm);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - totalImgHeightInMm; 
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, totalImgHeightInMm);
            heightLeft -= pdfHeight;
        }
        pdf.save(`${song?.title}.pdf`);
    };

    return (
      
        <>
        {song?.chord_sections && (<>
        <button onClick={handleDownloadPdf} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
                Download PDF
            </button>

            <div ref={ref} className="relative w-full p-4 bg-white">
                {selected.length !== 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-5">
                        {selected.map((name, i) => (
                            <div key={i} className="w-full aspect-square relative">
                                <img
                                    src={`/chord_diagram/${name}.png`}
                                    className="w-full aspect-square object-cover rounded-lg"
                                    crossOrigin="anonymous"
                                />
                            </div>
                        ))}
                    </div>
                )}
                <img src={song?.chord_sections?.sheetImg} className="h-auto w-full select-none" />
            </div>
        </>)}
        {!song?.chord_sections && <p className='text-center'>There is still no Chord Sheet. <br></br> Go to '<span className="text-[#ff8a05] font-bold">Edit Song</span>'  & upload Chord Sheet.</p>}
        </>
    );
}
