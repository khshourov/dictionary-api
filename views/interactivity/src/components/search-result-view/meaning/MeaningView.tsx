import React from 'react';
import { MeaningEntry } from '../../types';
import './MeaningView.css';

export function MeaningView({ meaning }: { meaning: MeaningEntry }) {
  return (
    <ul>
      <strong className="meaning">{meaning.meaning}</strong>
      {meaning.examples.map((example) => (
        <li>{example}</li>
      ))}
    </ul>
  );
}
