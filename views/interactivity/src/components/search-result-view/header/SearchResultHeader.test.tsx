import { render, screen } from '@testing-library/react';
import React from 'react';
import { SearchResultHeader } from './SearchResultHeader';

test('header should have the searched word and access-summary section (when provided)', async () => {
  const searchedWord = 'hello';
  const accessSummary = {
    totalAccess: 3,
    lastAccessAt: new Date('2024-01-01T00:00:00.000Z'),
  };

  render(
    <SearchResultHeader word={searchedWord} accessSummary={accessSummary} />,
  );

  const word = screen.getByText(searchedWord);
  const accessSummaryBlock = screen.queryByTestId('access-summary');

  expect(word).toBeDefined();
  expect(accessSummaryBlock).not.toBeNull();
});

test('header should not have any access-summary section for first time access of a word', async () => {
  const searchedWord = 'hello';

  render(<SearchResultHeader word={searchedWord} accessSummary={null} />);

  const accessSummaryBlock = screen.queryByTestId('access-summary');

  expect(accessSummaryBlock).toBeNull();
});

test('header should display source-links if provided', async () => {
  const searchedWord = 'hello';
  const sourceLinks = ['http://example.com/1', 'http://example.com/2'];

  render(
    <SearchResultHeader
      word={searchedWord}
      sourceLinks={sourceLinks}
      accessSummary={null}
    />,
  );

  expect(screen.queryByTestId('source-link-1')).toBeInTheDocument();
  expect(screen.queryByTestId('source-link-2')).toBeInTheDocument();
});

test('header should not display source-links if no link is provided', async () => {
  const searchedWord = 'hello';

  render(
    <SearchResultHeader
      word={searchedWord}
      sourceLinks={null}
      accessSummary={null}
    />,
  );

  expect(screen.queryByTestId('source-link-1')).not.toBeInTheDocument();
});
