import React from 'react';
import { render, screen } from '@testing-library/react';
import { MeaningView } from './MeaningView';

test('meaning block should display meaning and its corresponding examples', async () => {
  const meaning = {
    meaning: 'Meaning',
    examples: ['Example 1', 'Example 2'],
  };

  render(<MeaningView meaning={meaning} />);

  expect(screen.getByText(meaning.meaning)).toBeInTheDocument();
  expect(screen.getByText(meaning.examples[0])).toBeInTheDocument();
  expect(screen.getByText(meaning.examples[1])).toBeInTheDocument();
});
