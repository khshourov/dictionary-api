export type RegionPronunciation = {
  category: string;
  ipa: string;
  audio: string;
};
export type IPAListings = {
  us?: RegionPronunciation[];
  uk?: RegionPronunciation[];
};

export type MeaningEntry = {
  meaning: string;
  examples: string[];
};

export type Meaning = {
  categories: string;
  entries: MeaningEntry[];
};
export type DictionaryWord = {
  source: string;
  name: string;
  entry: {
    ipaListings: IPAListings;
    meanings: Meaning[];
  };
};

export type AccessSummary = {
  totalAccess: number;
  lastAccessAt: string;
};

export type DictionaryEntry = {
  dictionaryWord: DictionaryWord;
  accessSummary: AccessSummary | null;
};
