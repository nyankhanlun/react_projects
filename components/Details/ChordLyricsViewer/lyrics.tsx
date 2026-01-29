"use client";

import { useState } from "react";
import { findSongEg } from "./transpose";
import React from "react";
import { Song } from "@/app/types";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "Ab", "A", "A#", "B"];

export default function SongTransposer({ song }: { song: Song }) {
  const [toKey, setToKey] = useState("C");
  const songData = findSongEg(song, toKey);
  let output: any = [];
  if(songData.length != 0) {
  const song_data : any = songData[0]?.chordLyricssection
  song_data.map((content: any) => {
    const label = content.label
    const infoL = content.content
    output.push(
      <React.Fragment key={label} >
        
        <div style={{ color: "yellow" }}>
          <br></br>
          {label}</div>
        < div>{infoL} </div>
      </React.Fragment>
    );
  })
  }
 

  return (
    <div className="min-h-screen bg-gray-900 text-white p-3 sm:p-6">

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">

        <div className="flex gap-2">
          <select
            className="bg-gray-800 text-white p-2 rounded w-full sm:w-auto"
            value={toKey}
            onChange={(e) => setToKey(e.target.value)}
          >
            {NOTES.map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>

        </div>
        <h1 className="text-lg sm:text-2xl font-semibold">
          {song?.title}
        </h1>

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
        {songData.length != 0 && 
        <>
        <div>
          <p> Time Signature : {song?.timeSignature} </p>
          <p> BPM : {song?.bpm}</p>
          <p> Key : {songData[0]?.key}</p>
          <p> Music : {songData[0]?.music}</p>
        </div>
        {output}
        </>
        
         }
        {songData.length === 0 && <p>There is no Data for this Key </p> }
        

      </pre>
    </div>
  );
}

