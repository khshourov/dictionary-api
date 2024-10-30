import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AudioPlayer } from './AudioPlayer';

test('audio player should play audio when button is clicked', async () => {
  const id = 1;
  const src = 'https://domain.com/media/1.mp3';

  render(<AudioPlayer id={id} src={src} />);

  const audioPlayer: HTMLAudioElement = screen.getByTestId(
    `audio-player-${id}`,
  );
  jest.spyOn(audioPlayer, 'play').mockImplementation(() => Promise.resolve());

  const button = screen.getByTestId(`audio-button-${id}`);
  fireEvent.click(button);

  expect(audioPlayer.play).toHaveBeenCalled();
});
