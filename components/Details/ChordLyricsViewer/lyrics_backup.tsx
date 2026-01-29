"use client";

import { useState } from "react";
import { transposeText } from "./transpose";

const NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

export default function SongTransposerBackup() {
  const [fromKey] = useState("D#");
  const [toKey, setToKey] = useState("G");

  const song = `Intro - D# Cm G# A#
V1    D#
      Every praise is to our God
      Cm
      Every word of worship with one accord
      G# A# A#/D#  D#  G# - A# - D#
      Every praise, every praise is to our God`;

  const output = transposeText(song, fromKey, toKey);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-3 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <h1 className="text-lg sm:text-2xl font-semibold">
          Song Key Transposer
        </h1>

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
      </div>

      {/* Song content */}
      <pre className="
        whitespace-pre-wrap 
        text-base sm:text-lg 
        leading-relaxed
        font-mono
        bg-gray-800
        p-3 sm:p-6
        rounded
        overflow-x-auto
      ">
        {output}
      </pre>
    </div>
  );
}
