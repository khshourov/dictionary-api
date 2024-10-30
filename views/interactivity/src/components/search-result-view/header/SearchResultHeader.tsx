import React from 'react';
import { AccessSummary } from '../../types';
import { SearchResultAccessSummary } from './SearchResultAccessSummary';
import './SearchResultHeader.css';

export function SearchResultHeader({
  word,
  accessSummary,
}: {
  word: string;
  accessSummary: AccessSummary;
}) {
  return (
    <div className="header-container" data-testid="header-container">
      <div className="word">{word}</div>
      {accessSummary && (
        <SearchResultAccessSummary accessSummary={accessSummary} />
      )}
    </div>
  );
}
