import React, { useState, useEffect } from 'react';
import './App.css';
import { DictionaryApi } from './components/api/dictionary';
import SearchBox from './components/search-box/SearchBox';
import { DictionaryEntry } from './components/types';

function App() {
  const [bearerToken, setBearerToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [response, setResponse] = useState<DictionaryEntry | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = document.querySelector('meta[name="jwt-token"]');
    if (token) {
      setBearerToken(token.getAttribute('content'));
    }
  }, []);

  if (!bearerToken) {
    return <></>;
  }

  const dictionaryApi = new DictionaryApi({ token: bearerToken });
  return (
    <SearchBox
      dictionaryApi={dictionaryApi}
      onSuccess={setResponse}
      onError={setErrorMessage}
    />
  );
}

export default App;
