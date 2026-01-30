
export type User = {
  id: number;
  name: string;
  email: string;
};

export type ChordLyricsSection = {
  label: string;
  content: string;
};

export type KeySection = {
  key: string;
  music: string;
  chordLyricssection: ChordLyricsSection[];
};

export type TextSection = {
  label: string;
  content: string;
};

export type Song = {
  id: string;
  mode?: string;
  actions?: string;
  title: string;
  composer: string;
  timeSignature?: string;
  bpm?: string;
  key_sections?: KeySection[] | any;
  text_sections?: TextSection[] | any;
};


