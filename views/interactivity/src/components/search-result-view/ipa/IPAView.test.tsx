import React from 'react';
import { render, screen } from '@testing-library/react';
import { IPAView } from './IPAView';

test('ipa view should contain ipa and audio player', async () => {
  const id = 1;
  const ipa = {
    category: 'noun',
    ipa: '/ˈprez.ənt/',
    audio: 'http://domain.com/media/1.mp3',
  };
  render(<IPAView id={id} ipa={ipa} />);

  expect(screen.getByText(ipa.ipa)).toBeInTheDocument();
  expect(screen.getByText(`(${ipa.category})`)).toBeInTheDocument();
  expect(screen.queryByTestId(`audio-player-${id}`)).not.toBeNull();
});
