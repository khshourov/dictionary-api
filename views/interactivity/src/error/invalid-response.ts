export class InvalidResponseError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid Response');
    this.name = 'InvalidResponseError';
  }
}
