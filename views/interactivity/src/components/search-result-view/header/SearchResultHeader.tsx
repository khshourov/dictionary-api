import React from 'react';
import { AccessSummary } from '../../types';
import { SearchResultAccessSummary } from './SearchResultAccessSummary';
import './SearchResultHeader.css';

export function SearchResultHeader({
  word,
  accessSummary,
}: {
  word: string;
  accessSummary: AccessSummary | null;
}) {
  return (
    <div className="header-container" data-testid="header-container">
      <h1 className="word">{word}</h1>
      {accessSummary && (
        <SearchResultAccessSummary accessSummary={accessSummary} />
      )}
    </div>
  );
}
