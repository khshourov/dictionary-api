import React from 'react';
import { render, screen } from '@testing-library/react';
import { CategoryMeaningView } from './CategoryMeaningView';

test('it should display "Meanings" collapsible header with parts-of-speech wise sub collapsible section', async () => {
  const meanings = [
    {
      categories: 'noun',
      entries: [
        {
          meaning: 'noun-meaning',
          examples: ['noun-example'],
        },
      ],
    },
    {
      categories: 'adjective',
      entries: [
        {
          meaning: 'adjective-meaning',
          examples: ['adjective-example'],
        },
      ],
    },
  ];

  render(<CategoryMeaningView categoryMeanings={meanings} />);

  expect(screen.getByText('Meanings')).toBeInTheDocument();
  expect(screen.getByText('noun')).toBeInTheDocument();
  expect(screen.getByText('noun-meaning')).toBeInTheDocument();
  expect(screen.getByText('noun-example')).toBeInTheDocument();

  expect(screen.getByText('adjective')).toBeInTheDocument();
  expect(screen.getByText('adjective-meaning')).toBeInTheDocument();
  expect(screen.getByText('adjective-example')).toBeInTheDocument();
});
