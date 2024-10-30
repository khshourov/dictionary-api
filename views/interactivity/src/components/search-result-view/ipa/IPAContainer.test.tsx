import React from 'react';
import { render, screen } from '@testing-library/react';
import { IPAContainer } from './IPAContainer';

test('ipa container should view US and UK pronunciation block', async () => {
  const ipaListings = {
    uk: [
      {
        category: 'noun',
        ipa: '/heˈləʊ/',
        audio:
          'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',
      },
    ],
    us: [
      {
        category: 'noun',
        ipa: '/heˈloʊ/',
        audio:
          'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
      },
    ],
  };
  render(<IPAContainer ipaListings={ipaListings} />);

  expect(screen.getByText('🇺🇸')).toBeInTheDocument();
  expect(screen.getByText('🇬🇧')).toBeInTheDocument();
  expect(screen.getAllByText('(noun)')).toHaveLength(2);
});

test('ipa container should only view US if UK pronunciation is not defined', async () => {
  const ipaListings = {
    us: [
      {
        category: 'noun',
        ipa: '/heˈloʊ/',
        audio:
          'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
      },
    ],
  };
  render(<IPAContainer ipaListings={ipaListings} />);

  expect(screen.getByText('🇺🇸')).toBeInTheDocument();
  expect(screen.queryByText('🇬🇧')).not.toBeInTheDocument();
  expect(screen.getAllByText('(noun)')).toHaveLength(1);
});

test('ipa container should only view UK if US pronunciation is not defined', async () => {
  const ipaListings = {
    uk: [
      {
        category: 'noun',
        ipa: '/heˈləʊ/',
        audio:
          'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',
      },
    ],
  };
  render(<IPAContainer ipaListings={ipaListings} />);

  expect(screen.queryByText('🇺🇸')).not.toBeInTheDocument();
  expect(screen.getByText('🇬🇧')).toBeInTheDocument();
  expect(screen.getAllByText('(noun)')).toHaveLength(1);
});
