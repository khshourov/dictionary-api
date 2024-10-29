import React, { useState } from 'react';
import './App.css';
import SearchBox from './components/search-box/SearchBox';
import { DictionaryEntry } from './types';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [response, setResponse] = useState<DictionaryEntry | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return <SearchBox onResponse={setResponse} onError={setErrorMessage} />;
}

export default App;
