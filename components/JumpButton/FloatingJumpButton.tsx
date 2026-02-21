"use client";

import {  useEffect, useState } from "react";
import { ArrowDownIcon } from '@radix-ui/react-icons';

interface FloatingJumpButtonProps {
    targetRef: any;
    label?: string;
}

export default function FloatingJumpButton({
    targetRef,
    label = "Jump to Save",
}: FloatingJumpButtonProps) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            const hideOffset = 300;

            const isNearBottom =
                windowHeight + scrollTop >= fullHeight - hideOffset;

            if (scrollTop > 120 && !isNearBottom) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    const handleClick = () => {
        targetRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="
                        fixed
                        top-6
                        left-6
                        z-50
                        px-5
                        py-3
                        rounded-full
                        shadow-lg
                        bg-blue-600
                        text-white
                        text-xl
                        hover:bg-yellow-500
                        transition
                         "
        >
            <p className="flex flex-row mx-3"> <ArrowDownIcon className="w-7 h-7 text-bold" /> {label}</p>
         
        </button>
    );
}