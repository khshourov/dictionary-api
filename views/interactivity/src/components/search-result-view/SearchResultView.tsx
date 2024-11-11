import React from 'react';
import { DictionaryEntry } from '../types';
import { SearchResultHeader } from './header/SearchResultHeader';
import { IPAContainer } from './ipa/IPAContainer';
import { CategoryMeaningView } from './meaning/CategoryMeaningView';
import './SearchResultView.css';

export function SearchResultView({
  dictionaryEntry,
}: {
  dictionaryEntry: DictionaryEntry;
}) {
  return (
    <div className="card">
      <SearchResultHeader
        word={dictionaryEntry.dictionaryWord.name}
        sourceLinks={dictionaryEntry.dictionaryWord.sourceLinks}
        accessSummary={dictionaryEntry.accessSummary}
      />
      <div className="divider">
        <hr data-testid="divider" />
      </div>
      <IPAContainer
        ipaListings={dictionaryEntry.dictionaryWord.entry.ipaListings}
      />
      <CategoryMeaningView
        categoryMeanings={dictionaryEntry.dictionaryWord.entry.meanings}
      />
    </div>
  );
}
