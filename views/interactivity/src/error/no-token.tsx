export class NoBearerTokenError extends Error {
  constructor(message?: string) {
    super(message ?? 'No bearer token');
    this.name = 'NoBearerTokenError';
  }
}
