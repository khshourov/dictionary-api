import React, { useState } from 'react';
import './App.css';
import { DictionaryApi } from './components/api/dictionary';
import { ErrorResultView } from './components/general/ErrorResultView';
import SearchBox from './components/search-box/SearchBox';
import { SearchResultView } from './components/search-result-view/SearchResultView';
import { DictionaryEntry } from './components/types';
import { NoBearerTokenError } from './error/no-token';

function App() {
  const [response, setResponse] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState<unknown>(null);

  function handleSuccess(dictionaryEntry: DictionaryEntry) {
    setError(null);
    setResponse(dictionaryEntry);
  }

  function handleError(error: unknown) {
    setResponse(null);
    setError(error);
  }

  const queryParams = new URLSearchParams(window.location.search);
  const bearerToken = queryParams.get('token');
  if (!bearerToken) {
    throw new NoBearerTokenError();
  }

  const dictionaryApi = new DictionaryApi({ token: bearerToken });
  return (
    <>
      <SearchBox
        dictionaryApi={dictionaryApi}
        onSuccess={handleSuccess}
        onError={handleError}
      />
      <div className="search-result-container">
        <>
          {response && <SearchResultView dictionaryEntry={response} />}
          {error && <ErrorResultView error={error} />}
        </>
      </div>
    </>
  );
}

export default App;
