import React, { useState } from 'react';
import './App.css';
import { DictionaryApi } from './components/api/dictionary';
import SearchBox from './components/search-box/SearchBox';
import { SearchResultView } from './components/search-result-view/SearchResultView';
import { DictionaryEntry } from './components/types';

function App() {
  const [response, setResponse] = useState<DictionaryEntry | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryParams = new URLSearchParams(window.location.search);
  const bearerToken = queryParams.get('token');
  if (!bearerToken) {
    window.location.href = '/auth/google';
    return <></>;
  }

  const dictionaryApi = new DictionaryApi({ token: bearerToken });
  return (
    <>
      <SearchBox
        dictionaryApi={dictionaryApi}
        onSuccess={setResponse}
        onError={setErrorMessage}
      />
      {response && <SearchResultView dictionaryEntry={response} />}
    </>
  );
}

export default App;
