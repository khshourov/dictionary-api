import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorResultView } from './ErrorResultView';
import { NotFoundError } from '../../error/not-found';
import { InvalidResponseError } from '../../error/invalid-response';
import { InternalServerError } from '../../error/server';

test('not-found error will display `:search-word not found`', () => {
  const searchWord = 'hello';
  const notFoundError = new NotFoundError(`${searchWord} not found`);

  render(<ErrorResultView error={notFoundError} />);

  expect(screen.getByText(`${searchWord} not found`)).toBeInTheDocument();
});

test('invalid-response error will display `Something went wrong. Please try again.`', () => {
  const invalidResponseError = new InvalidResponseError();

  render(<ErrorResultView error={invalidResponseError} />);

  expect(
    screen.getByText('Something went wrong. Please try again.'),
  ).toBeInTheDocument();
});

test('server error will display `Something went wrong. Please try again.`', () => {
  const serverError = new InternalServerError();

  render(<ErrorResultView error={serverError} />);

  expect(
    screen.getByText('Something went wrong. Please try again.'),
  ).toBeInTheDocument();
});

// Right now, I can't test AuthorizationError and NoBearerToken as we are redirecting.
