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

export function findSong(data: any, toKey: any) {
  const transKey = data?.key_sections
  let list: any = [];
  transKey.map((info: any) => {
    if (toKey === info?.transpose_keys) {

      const infoArr = info.data
      infoArr.map((content: any) => {
        const label = content.type
        const infoL = content.lyrics
        list.push(
          <React.Fragment key={label} >
            <div>Intro </div>
            < div > {info.intro} </div>
            < br />
            <div style={{ color: "blue" }}> {label} </div>
            < div > {infoL.join("\n")} </div>
          </React.Fragment>

        );

      })

    }
  })

  // const result = list.join('\n');
  return {
    targetKey: toKey,
    transposedData: list
  };
}

export function findSongEg(data: any, toKey: any) {
  let section : any = []
  if (data?.key_sections) {
    const transKey = data?.key_sections
    section = transKey.find(
      (section: any) => section.key === toKey
    );
  }else{
    return []
  }

  if (section === undefined) return []
  return [section]
}