import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';

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
  render(<SearchBox onResponse={jest.fn()} onError={jest.fn()} />);

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
        json: () => Promise.resolve({}),
      }) as Promise<Response>,
  );
  const onResponse = jest.fn();
  const onError = jest.fn();
  const searchWord = 'hello';

  render(<SearchBox onResponse={onResponse} onError={onError} />);

  userEvent.type(screen.getByPlaceholderText('Word'), searchWord);
  userEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(onResponse).toHaveBeenCalledWith({});
    expect(onError).toHaveBeenCalledTimes(0);
  });
});

test('on button click, error message should return if no word is found', async () => {
  global.fetch = jest.fn(
    () =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      }) as Promise<Response>,
  );
  const onResponse = jest.fn();
  const onError = jest.fn();
  const searchWord = 'hello';

  render(<SearchBox onResponse={onResponse} onError={onError} />);

  userEvent.type(screen.getByPlaceholderText('Word'), searchWord);
  userEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(onResponse).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledWith(`${searchWord} not found`);
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
  const onResponse = jest.fn();
  const onError = jest.fn();
  const searchWord = 'hello';

  render(<SearchBox onResponse={onResponse} onError={onError} />);

  userEvent.type(screen.getByPlaceholderText('Word'), searchWord);
  userEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(onResponse).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledWith(
      'Something went wrong. Please try again.',
    );
  });
});

test('on button click, error message should return if exception occurs', async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Some error occurred')),
  );
  const onResponse = jest.fn();
  const onError = jest.fn();
  const searchWord = 'hello';

  render(<SearchBox onResponse={onResponse} onError={onError} />);

  userEvent.type(screen.getByPlaceholderText('Word'), searchWord);
  userEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(onResponse).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledWith(
      'Something went wrong. Please try again.',
    );
  });
});
