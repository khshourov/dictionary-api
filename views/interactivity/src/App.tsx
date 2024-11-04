import React, { useEffect, useState, useMemo } from 'react';
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

  function hasSearchWord() {
    const searchWord = queryParams.get('searchWord');
    return searchWord && searchWord.trim().length > 0;
  }

  const queryParams = new URLSearchParams(window.location.search);
  const bearerToken = queryParams.get('token');
  if (!bearerToken) {
    throw new NoBearerTokenError();
  }
  const searchWord = queryParams.get('searchWord');
  const dictionaryApi = useMemo(
    () => new DictionaryApi({ token: bearerToken }),
    [bearerToken],
  );

  useEffect(() => {
    if (searchWord && searchWord.trim().length > 0) {
      dictionaryApi
        .fetch(searchWord.trim())
        .then((response) => {
          handleSuccess(response);
        })
        .catch((err) => {
          handleError(err);
        });
    }
  }, [dictionaryApi, searchWord]);

  return (
    <>
      {!hasSearchWord() && (
        <SearchBox
          dictionaryApi={dictionaryApi}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}
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
