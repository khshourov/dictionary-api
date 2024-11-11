import React from 'react';
import { AccessSummary } from '../../types';
import { SearchResultAccessSummary } from './SearchResultAccessSummary';
import './SearchResultHeader.css';

export function SearchResultHeader({
  word,
  sourceLinks,
  accessSummary,
}: {
  word: string;
  sourceLinks?: string[] | null;
  accessSummary: AccessSummary | null;
}) {
  return (
    <div className="header-container" data-testid="header-container">
      <div className="word-with-links">
        <h1 className="word">{word}</h1>
        {sourceLinks?.map((link, index) => (
          <sup>
            <a
              data-testid={`source-link-${index + 1}`}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`#${index + 1}`}
            </a>
          </sup>
        ))}
      </div>
      {accessSummary && (
        <SearchResultAccessSummary accessSummary={accessSummary} />
      )}
    </div>
  );
}
