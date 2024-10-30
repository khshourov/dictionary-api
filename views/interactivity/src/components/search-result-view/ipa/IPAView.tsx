import React from 'react';
import { RegionPronunciation } from '../../types';
import { AudioPlayer } from '../../general/AudioPlayer';
import './IPAView.css';

export function IPAView({ id, ipa }: { id: number; ipa: RegionPronunciation }) {
  return (
    <>
      <div className="pronunciation-block">
        <span className="ipa">
          {ipa.ipa}
          {ipa.category && <sup>({ipa.category})</sup>}
        </span>
        <AudioPlayer id={id} src={ipa.audio} />
      </div>
    </>
  );
}
