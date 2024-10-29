export class AuthorizationError extends Error {
  constructor(message?: string) {
    super(message ?? 'Not Authorized');
    this.name = 'AuthorizationError';
  }
}
