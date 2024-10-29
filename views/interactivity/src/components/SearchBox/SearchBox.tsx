import React, { useState, useEffect } from 'react';
import { DictionaryAPIResponse } from '../../types';
import './SearchBox.css';

type Props = {
  onResponse: (response: DictionaryAPIResponse) => void;
  onError: (errorMessage: string) => void;
};

export default function SearchBox({ onResponse, onError }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState<string>('');

  useEffect(() => {
    const token = document.querySelector('meta[name="jwt-token"]');
    if (token) {
      setToken(token.getAttribute('content'));
    }
  }, []);

  function handleInput(input: string) {
    setSearchWord(input);
  }

  function handleSearch() {
    fetch(`${process.env.APP_BASE_URL}/dictionary/${searchWord}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 404) {
            return onError(`${searchWord} not found`);
          } else {
            return onError('Something went wrong. Please try again.');
          }
        }
        onResponse((await response.json()) as unknown as DictionaryAPIResponse);
      })
      .catch(() => {
        onError('Something went wrong. Please try again.');
      });
  }

  return (
    <>
      <input
        className="form__field"
        type="text"
        placeholder="Word"
        onChange={(event) => handleInput(event.target.value)}
      />
      <button
        className="btn btn--primary btn--inside"
        type="button"
        onClick={handleSearch}
      >
        Search
      </button>
    </>
  );
}
