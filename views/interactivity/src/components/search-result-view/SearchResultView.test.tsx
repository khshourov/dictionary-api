import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchResultView } from './SearchResultView';

test('it should display all the dictionary entry information', () => {
  const dictionaryEntry = {
    dictionaryWord: {
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
    accessSummary: {
      totalAccess: 1,
      lastAccessAt: new Date('2024-01-01T00:00:00.000Z'),
    },
  };

  render(<SearchResultView dictionaryEntry={dictionaryEntry} />);

  expect(screen.queryByTestId('header-container')).toBeInTheDocument();
  expect(screen.getByTestId('divider')).toBeInTheDocument();
  expect(screen.queryByTestId('ipa-container')).toBeInTheDocument();
  expect(screen.getByText('Meanings')).toBeInTheDocument();
});
