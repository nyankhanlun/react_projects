"use client";

import { Song } from '@/app/types';
import React from "react";


export default function LyricsViewer({ song }: { song: Song }) {
  let output: any = [];
  if (song?.text_sections) {
    const songData: any = song?.text_sections

    songData.map((content: any, index: any) => {
      const label = content.label
      const infoL = content.content
      output.push(
        <React.Fragment key={index} >
          <div style={{ color: "yellow" }}>
            <br></br>
            {label}</div>
          < div>{infoL} </div>
        </React.Fragment>
      );
    })
  } else {
    output.push(
      <React.Fragment key={output.length}>
        <p>There is no Lyrics for this song.</p>
      </React.Fragment>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-center sm:justify-between mb-4">
        <h1 className="text-lg sm:text-2xl font-semibold">
          {song?.title}
        </h1>
        <p className="text-base sm:text-2xl sm:text-inherit">
          Composer -  {song?.composer}
        </p>
      </div>
      <pre className="
        whitespace-pre-wrap 
        text-sm md:text-base 
        leading-relaxed
        bg-gray-800
        p-3 sm:p-6
        rounded
        overflow-x-auto
      ">
        <p>Original Key - <span style={{ color: "yellow", fontWeight : "bold" }}>{song?.originalKey}</span> </p>
        {output}

      </pre>
    </div>
  );
}

