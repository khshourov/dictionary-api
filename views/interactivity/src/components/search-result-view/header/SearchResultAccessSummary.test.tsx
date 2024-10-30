import { render, screen } from '@testing-library/react';
import React from 'react';
import { SearchResultAccessSummary } from './SearchResultAccessSummary';

test('access-summary block should show last access date and total access for searched word', async () => {
  const accessSummary = {
    lastAccessAt: '2024-01-01T00:00:00.000Z',
    totalAccess: 313,
  };

  render(<SearchResultAccessSummary accessSummary={accessSummary} />);

  expect(screen.getByText('2024-01-01 00:00:00')).toBeDefined();
  expect(screen.getByText('313')).toBeDefined();
});
