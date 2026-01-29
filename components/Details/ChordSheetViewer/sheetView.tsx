'use client';

import Image, { StaticImageData } from 'next/image';
import {
    TransformWrapper,
    TransformComponent,
} from 'react-zoom-pan-pinch';
import classes from './sheetView.module.css'

interface SheetMusicViewerProps {
    src: StaticImageData | string;
}

export default function SheetViewer({
    src,
}: SheetMusicViewerProps) {
    return (
        <div className="relative w-full">
            <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
                wheel={{ step: 0.1 }}
                pinch={{ step: 5 }}
                doubleClick={{ mode: 'zoomIn' }}
                panning={{ velocityDisabled: true }}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        {/* Zoom Controls */}
                        <div className="absolute right-1 z-10 flex gap-2">
                            <button onClick={() => zoomIn()} className={classes.customButton}>
                                +
                            </button>
                            <button onClick={() => zoomOut()} className={classes.customButton}>
                                −
                            </button>
                            <button onClick={() => resetTransform()} className={classes.customButton}>
                                Reset
                            </button>
                        </div>


                        {/* <TransformComponent
                            wrapperClass="h-full w-full"
                            contentClass="w-full"
                        >
                            <div className="flex justify-center pt-8">
                                <Image
                                    src={src}
                                    alt="Sheet music"
                                    priority
                                    className="h-auto max-w-full select-none"
                                />
                            </div>
                        </TransformComponent> */}
                        <TransformComponent
                            wrapperClass="!w-full !h-full" // Use ! (important) to override library defaults
                            contentClass="w-full flex justify-center items-center lg:min-h-screen"
                        >
                            <div className="flex justify-center pt-8">
                                <Image
                                    src={src}
                                    alt="Sheet music"
                                    priority
                                    className="h-auto max-w-full select-none"
                                />
                            </div>
                        </TransformComponent>

                    </>
                )}
            </TransformWrapper>
        </div>
    );
}
