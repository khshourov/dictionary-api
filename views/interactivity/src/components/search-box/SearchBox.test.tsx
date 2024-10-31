import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';
import { DictionaryApi } from '../api/dictionary';
import { NotFoundError } from '../../error/not-found';
import { InvalidResponseError } from '../../error/invalid-response';
import { InternalServerError } from '../../error/server';

const searchWord = 'innocuous';
const validResponse = {
  dictionaryWord: {
    word: searchWord,
    lexicalEntry:
      'H4sIAAAAAAAEE6WQz0rEMBDGXyXMSWFpFrxIwYP/EEEvepRFsu3YzrbJlPwRl6V3j+rNV/BNFl/KSXfBowcJCZMvXya/fBsInHyFUML56e3Z3fXF1SXMwBmbJXKOq8QpiIQu+jWUG6DB3FCI5JqQt6mD8mEDlYnYcHaAmMUjhd5+fb+67UdXrFKx/QxaTkyqieWsjXEIpdY1VZHYGb8uKmOXnuoGC/aNtliT0eiankKrU/c4eHY6SUV5OqnzSm4+Py7scATjYgZC+gfM+/db0f0fJ+xwSGeQKabdmsPa04wzsGgEMOf0mxChbMHUK5SPP+M+2UkV0/6GOCq2Q48R+7Vqjbc9hqAOTlRlUpCWyvEkH5a5wYvJ3vwM3LNFZVNoPbMNqmfu1MSXydQyRWU8iqKeTBXVwBTYZWZYjHmMPxC0hzQRAgAA',
  },
  accessSummary: {
    totalAccess: 1,
    lastAccessAt: '2024-10-28T16:20:42.846Z',
  },
};
const invalidResponse = {
  dictionaryWord: {
    word: searchWord,
  },
  accessSummary: {
    totalAccess: 1,
    lastAccessAt: '2024-10-28T16:20:42.846Z',
  },
};
const dictionaryApi = new DictionaryApi({ token: 'bearer-token' });

beforeAll(() => {
  process.env.APP_BASE_URL = '';

  const meta = document.createElement('meta');
  meta.name = 'jwt-token';
  meta.content = 'mocked-jwt-token';
  document.head.appendChild(meta);
});

afterAll(() => {
  const meta = document.querySelector('meta[name="jwt-token"]');
  if (meta) {
    document.head.removeChild(meta);
  }

  delete process.env.APP_BASE_URL;
});

test('search box should contain a text box and a button', async () => {
  render(
    <SearchBox
      dictionaryApi={dictionaryApi}
      onSuccess={jest.fn()}
      onError={jest.fn()}
    />,
  );

  const wordInputBox = screen.getByPlaceholderText('Word');
  const button = screen.getByRole('button', { name: 'Search' });

  expect(wordInputBox).toHaveAttribute('type', 'text');
  expect(button).toBeInTheDocument();
});

test('on button click, successful api response should returned', async () => {
  global.fetch = jest.fn(
    () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(validResponse),
      }) as Promise<Response>,
  );
  const onSuccess = jest.fn();
  const onError = jest.fn();

  render(
    <SearchBox
      dictionaryApi={dictionaryApi}
      onSuccess={onSuccess}
      onError={onError}
    />,
  );

  userEvent.type(screen.getByPlaceholderText('Word'), searchWord);
  userEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(0);
  });
});

test('on button click, not-found error should return if no word is found', async () => {
  global.fetch = jest.fn(
    () =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      }) as Promise<Response>,
  );
  const onSuccess = jest.fn();
  const onError = jest.fn();
  const searchWord = 'hello';

  render(
    <SearchBox
      dictionaryApi={dictionaryApi}
      onSuccess={onSuccess}
      onError={onError}
    />,
  );

  userEvent.type(screen.getByPlaceholderText('Word'), searchWord);
  userEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledWith(expect.any(NotFoundError));
  });
});

test('on button click, error message should return if api returns invalid response', async () => {
  global.fetch = jest.fn(
    () =>
      Promise.resolve({
        ok: true,
        status: 404,
        json: () => Promise.resolve(invalidResponse),
      }) as Promise<Response>,
  );
  const onSuccess = jest.fn();
  const onError = jest.fn();
  const searchWord = 'hello';

  render(
    <SearchBox
      dictionaryApi={dictionaryApi}
      onSuccess={onSuccess}
      onError={onError}
    />,
  );

  userEvent.type(screen.getByPlaceholderText('Word'), searchWord);
  userEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledWith(expect.any(InvalidResponseError));
  });
});

test('on button click, error message should return if server returns status code other than 200 and 404', async () => {
  global.fetch = jest.fn(
    () =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('Internal Server Error')),
      }) as Promise<Response>,
  );
  const onSuccess = jest.fn();
  const onError = jest.fn();
  const searchWord = 'hello';

  render(
    <SearchBox
      dictionaryApi={dictionaryApi}
      onSuccess={onSuccess}
      onError={onError}
    />,
  );

  userEvent.type(screen.getByPlaceholderText('Word'), searchWord);
  userEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledWith(expect.any(InternalServerError));
  });
});

test('on button click, error message should return if exception occurs', async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Some error occurred')),
  );
  const onSuccess = jest.fn();
  const onError = jest.fn();
  const searchWord = 'hello';

  render(
    <SearchBox
      dictionaryApi={dictionaryApi}
      onSuccess={onSuccess}
      onError={onError}
    />,
  );

  userEvent.type(screen.getByPlaceholderText('Word'), searchWord);
  userEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });
});
