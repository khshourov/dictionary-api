import React from 'react';
import { Icon } from './Icon';

export function AudioPlayer({ id, src }: { id: number; src: string }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <div
        data-testid={`audio-button-${id}`}
        className="icon"
        onClick={handlePlay}
      >
        <Icon iconType="audio" />
      </div>
      <audio data-testid={`audio-player-${id}`} ref={audioRef} src={src} />
    </>
  );
}
