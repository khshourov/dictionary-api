import { InferType } from 'yup';
import {
  lexicalEntrySchema,
  responseSchema,
  ipaListingSchema,
  meaningEntrySchema,
  meaningSchema,
} from './api/dictionary.validator';

export type DictionaryWord = InferType<typeof lexicalEntrySchema>;
export type AccessSummary = NonNullable<
  InferType<typeof responseSchema>['accessSummary']
>;
export type DictionaryEntry = {
  dictionaryWord: DictionaryWord;
  accessSummary: AccessSummary;
};
export type RegionPronunciation = InferType<typeof ipaListingSchema>;
export type IPAListings = DictionaryWord['entry']['ipaListings'];
export type MeaningEntry = InferType<typeof meaningEntrySchema>;
export type Meaning = InferType<typeof meaningSchema>;
