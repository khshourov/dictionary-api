import React, { useState } from 'react';
import './App.css';
import { DictionaryApi } from './components/api/dictionary';
import SearchBox from './components/search-box/SearchBox';
import { SearchResultView } from './components/search-result-view/SearchResultView';
import { DictionaryEntry } from './components/types';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [response, setResponse] = useState<DictionaryEntry | null>({
    dictionaryWord: {
      name: 'hello',
      entry: {
        ipaListings: {
          uk: [
            {
              category: '',
              ipa: '/heˈləʊ/',
              audio:
                'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',
            },
          ],
          us: [
            {
              category: '',
              ipa: '/heˈloʊ/',
              audio:
                'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
            },
          ],
        },
        meanings: [
          {
            categories: 'exclamation, noun',
            entries: [
              {
                meaning: 'used when meeting or greeting someone:',
                examples: ["Hello, Paul. I haven't seen you for ages."],
              },
            ],
          },
        ],
      },
    },
    accessSummary: {
      totalAccess: 1,
      lastAccessAt: new Date('2024-01-01T00:00:00.000Z'),
    },
  });
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
