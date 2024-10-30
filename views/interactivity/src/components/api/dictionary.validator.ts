import { array, date, number, object, string } from 'yup';

export const responseSchema = object({
  dictionaryWord: object({
    word: string().required(),
    lexicalEntry: string().required(),
  }).required(),
  accessSummary: object({
    totalAccess: number().required(),
    lastAccessAt: date().required(),
  }).nullable(),
});

const ipaListingSchema = object({
  category: string().nonNullable().defined(),
  ipa: string().required(),
  audio: string().url().required(),
});

const meaningEntrySchema = object({
  meaning: string().required(),
  examples: array().of(string()).required(),
});

const meaningSchema = object({
  categories: string().required(),
  entries: array().of(meaningEntrySchema).required(),
});

export const lexicalEntrySchema = object({
  name: string().required(),
  entry: object({
    ipaListings: object({
      uk: array().of(ipaListingSchema).optional(),
      us: array().of(ipaListingSchema).optional(),
    }).test(
      'at-least-one',
      'At least the UK or US variant of IPA is required',
      (value) => !!value.uk || !!value.us,
    ),
    meanings: array().of(meaningSchema).required(),
  }).required(),
});
