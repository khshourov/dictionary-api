import React from 'react';
import { AuthorizationError } from '../../error/authorization';
import { NoBearerTokenError } from '../../error/no-token';
import { NotFoundError } from '../../error/not-found';
import './ErrorResultView.css';

export function ErrorResultView({ error }: { error: any }) {
  if (
    error instanceof AuthorizationError ||
    error instanceof NoBearerTokenError
  ) {
    window.location.href = '/auth/login';
    return <></>;
  }

  let errorMessage = 'Something went wrong. Please try again.';
  if (error instanceof NotFoundError) {
    errorMessage = error.message;
  }
  return (
    <div className="error-message">
      <span className="error-text">{errorMessage}</span>
    </div>
  );
}
