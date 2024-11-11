import { lexicalEntrySchema, responseSchema } from './dictionary.validator';

describe('lexical-entry schema validate', () => {
  test.each([
    [
      {
        name: 'hello',
        sourceLinks: [
          'https://dictionary.cambridge.org/pronunciation/english/hello',
          'https://dictionary.cambridge.org/dictionary/english/hello',
        ],
        entry: {
          ipaListings: {
            uk: [
              {
                category: '',
                ipa: '/heˈləʊ/',
                audio:
                  'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',
              },
            ],
            us: [
              {
                category: '',
                ipa: '/heˈloʊ/',
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
              },
            ],
          },
          meanings: [
            {
              categories: 'exclamation, noun',
              entries: [
                {
                  meaning: 'used when meeting or greeting someone:',
                  examples: ["Hello, Paul. I haven't seen you for ages."],
                },
              ],
            },
          ],
        },
      },
    ],
    [
      {
        name: 'hello',
        entry: {
          ipaListings: {
            uk: [
              {
                category: '',
                ipa: '/heˈləʊ/',
                audio:
                  'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',
              },
            ],
          },
          meanings: [],
        },
      },
    ],
    [
      {
        name: 'hello',
        entry: {
          ipaListings: {
            us: [
              {
                category: '',
                ipa: '/heˈloʊ/',
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
              },
            ],
          },
          meanings: [
            {
              categories: 'exclamation, noun',
              entries: [],
            },
          ],
        },
      },
    ],
    [
      {
        name: 'hello',
        entry: {
          ipaListings: {
            us: [
              {
                category: '',
                ipa: '/heˈloʊ/',
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
              },
            ],
          },
          meanings: [
            {
              categories: '', // categories can be empty
              entries: [],
            },
          ],
        },
      },
    ],
    [
      {
        name: 'hello',
        sourceLinks: [], // sourceLinks can be empty
        entry: {
          ipaListings: {
            us: [
              {
                category: '',
                ipa: '/heˈloʊ/',
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
              },
            ],
          },
          meanings: [
            {
              categories: 'noun',
              entries: [],
            },
          ],
        },
      },
    ],
  ])('schema should accept all valid lexical-entries', (validObject) => {
    expect(lexicalEntrySchema.isValidSync(validObject)).toBe(true);
  });

  test.each([
    [
      {
        entry: {
          ipaListings: {
            us: [
              {
                category: '',
                ipa: '/heˈloʊ/',
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
              },
            ],
          },
          meanings: [
            {
              categories: 'exclamation, noun',
              entries: [
                {
                  meaning: 'used when meeting or greeting someone:',
                  examples: ["Hello, Paul. I haven't seen you for ages."],
                },
              ],
            },
          ],
        },
      },
    ],
    [
      {
        name: 'hello',
        entry: {
          ipaListings: {},
          meanings: [
            {
              categories: 'exclamation, noun',
              entries: [
                {
                  meaning: 'used when meeting or greeting someone:',
                  examples: ["Hello, Paul. I haven't seen you for ages."],
                },
              ],
            },
          ],
        },
      },
    ],
    [
      {
        name: 'hello',
        entry: {
          ipaListings: {
            us: [
              {
                category: '',
                ipa: '/heˈloʊ/',
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
              },
            ],
          },
        },
      },
    ],
    [
      {
        name: 'hello',
        entry: {
          meanings: [
            {
              categories: 'exclamation, noun',
              entries: [
                {
                  meaning: 'used when meeting or greeting someone:',
                  examples: ["Hello, Paul. I haven't seen you for ages."],
                },
              ],
            },
          ],
        },
      },
    ],
    [
      {
        name: 'hello',
      },
    ],
  ])('schema should reject all invalid lexical-entries', (invalidObject) => {
    expect(lexicalEntrySchema.isValidSync(invalidObject)).toBe(false);
  });
});

describe('response-schema validate', () => {
  test.each([
    [
      {
        dictionaryWord: {
          word: 'hello',
          lexicalEntry: 'base64-encoded string',
        },
        accessSummary: {
          totalAccess: 1,
          lastAccessAt: '2024-10-30T08:04:48.390Z',
        },
      },
    ],
    [
      {
        dictionaryWord: {
          word: 'hello',
          lexicalEntry: 'base64-encoded string',
        },
        accessSummary: null,
      },
    ],
  ])('schema should accept all valid response', (validResponse) => {
    expect(responseSchema.isValidSync(validResponse)).toBe(true);
  });

  test.each([
    [
      {
        dictionaryWord: {
          word: 'hello',
        },
        accessSummary: {
          totalAccess: 1,
          lastAccessAt: '2024-10-30T08:04:48.390Z',
        },
      },
    ],
    [
      {
        dictionaryWord: {
          lexicalEntry: 'base64-encoded string',
        },
        accessSummary: {
          totalAccess: 1,
          lastAccessAt: '2024-10-30T08:04:48.390Z',
        },
      },
    ],
    [
      {
        dictionaryWord: {},
        accessSummary: {
          totalAccess: 1,
          lastAccessAt: '2024-10-30T08:04:48.390Z',
        },
      },
    ],
    [
      {
        dictionaryWord: {
          word: 'hello',
          lexicalEntry: 'base64-encoded string',
        },
        accessSummary: {
          lastAccessAt: '2024-10-30T08:04:48.390Z',
        },
      },
    ],
    [
      {
        dictionaryWord: {
          word: 'hello',
          lexicalEntry: 'base64-encoded string',
        },
        accessSummary: {
          totalAccess: 1,
        },
      },
    ],
    [
      {
        accessSummary: {
          totalAccess: 1,
          lastAccessAt: '2024-10-30T08:04:48.390Z',
        },
      },
    ],
  ])('schema should reject all invalid response', (invalidResponse) => {
    expect(responseSchema.isValidSync(invalidResponse)).toBe(false);
  });
});
