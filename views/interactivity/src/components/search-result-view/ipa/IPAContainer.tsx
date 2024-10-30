import React from 'react';
import { IPAListings } from '../../types';
import { IPAView } from './IPAView';
import './IPAContainer.css';

export function IPAContainer({ ipaListings }: { ipaListings: IPAListings }) {
  return (
    <div className="region-block" data-testid="ipa-container">
      {!!ipaListings['us'] && (
        <div className="pronunciation-container">
          <span>🇺🇸</span>
          {ipaListings['us'].map((ipa, id) => (
            <IPAView id={id} ipa={ipa} />
          ))}
        </div>
      )}
      {!!ipaListings['uk'] && (
        <div className="pronunciation-container">
          <span>🇬🇧</span>
          {ipaListings['uk'].map((ipa, id) => (
            <IPAView id={id} ipa={ipa} />
          ))}
        </div>
      )}
    </div>
  );
}
