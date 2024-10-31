import React, { useState } from 'react';
import './App.css';
import { DictionaryApi } from './components/api/dictionary';
import SearchBox from './components/search-box/SearchBox';
import { SearchResultView } from './components/search-result-view/SearchResultView';
import { DictionaryEntry } from './components/types';
import { NoBearerTokenError } from './error/no-token';

function App() {
  const [response, setResponse] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState<unknown>(null);

  const queryParams = new URLSearchParams(window.location.search);
  const bearerToken = queryParams.get('token');
  if (!bearerToken) {
    throw new NoBearerTokenError();
  }
  if (error) {
    throw error;
  }

  const dictionaryApi = new DictionaryApi({ token: bearerToken });
  return (
    <>
      <SearchBox
        dictionaryApi={dictionaryApi}
        onSuccess={setResponse}
        onError={setError}
      />
      {response && <SearchResultView dictionaryEntry={response} />}
    </>
  );
}

export default App;
