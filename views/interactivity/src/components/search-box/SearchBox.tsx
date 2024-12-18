import React, { useState } from 'react';
import { DictionaryApi } from '../api/dictionary';
import './SearchBox.css';
import { DictionaryEntry } from '../types';

type Props = {
  dictionaryApi: DictionaryApi;
  onSuccess: (response: DictionaryEntry) => void;
  onError: (error: unknown) => void;
};

export default function SearchBox({
  dictionaryApi,
  onSuccess,
  onError,
}: Props) {
  const [searchWord, setSearchWord] = useState<string>('');

  function handleInput(input: string) {
    setSearchWord(input);
  }

  async function handleSearch() {
    if (searchWord.trim().length === 0) {
      return;
    }

    try {
      onSuccess(await dictionaryApi.fetch(searchWord.trim()));
    } catch (err: unknown) {
      onError(err);
    }
  }

  return (
    <>
      <input
        className="form__field"
        type="text"
        placeholder="Word"
        onChange={(event) => handleInput(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
      />
      <button
        className="btn btn--primary btn--inside"
        type="button"
        onClick={handleSearch}
        disabled={searchWord.trim().length === 0}
      >
        Search
      </button>
    </>
  );
}
