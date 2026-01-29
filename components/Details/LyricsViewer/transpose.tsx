import React from "react";

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function transposeText(text: any, fromKey: any, toKey: any) {
  const shift = NOTES.indexOf(toKey) - NOTES.indexOf(fromKey);
  return text.replace(/\b[A-G]#?(?:m)?(?:\/[A-G]#?)?\b/g, (c: any) => {
    const [root, rest] = [c.match(/^[A-G]#?/)[0], c.replace(/^[A-G]#?/, '')];
    const i = NOTES.indexOf(root);
    return NOTES[(i + shift + 12) % 12] + rest;
  });
}

// export function findLyrics(data: any, toKey: any) {
//   const song = data?.text_sections

//   return {
//       "title": data.title,
//       "tempo": data.tempo,
//       ...song
    
//   };
// }

export function findSongEg(data: any, toKey: any) {
  const transKey = data?.key_sections
  const list = transKey.find(
    (info: any) => toKey === info?.transpose_keys
  );

  return {
    
      "title": data.title,
      "tempo": data.tempo,
      ...list
    
  };
}