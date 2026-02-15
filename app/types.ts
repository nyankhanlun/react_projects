
export type User = {
  id: string | any;
  name: string;
  email: string;
  password?: string;
  confirmpassword?: string;
  country?: string;
  role?: string, 
  plan?: string,
  stripeCustomerId?: string,
  teamId?: string,
  createdAt?: string,
  onboardingDone?: boolean
};

export type ChordSheetSection = {
  diagrams: any;
  sheetImg: any;
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
  originalKey?: string;
  timeSignature?: string;
  bpm?: string;
  key_sections?: KeySection[] | any;
  text_sections?: TextSection[] | any;
  chord_sections?: ChordSheetSection | any;
  createdAt?: any;
  updatedAt?: any;
};


