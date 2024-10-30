import { AuthorizationError } from '../../error/authorization';
import { InvalidResponseError } from '../../error/invalid-response';
import { NotFoundError } from '../../error/not-found';
import { InternalServerError } from '../../error/server';
import { DictionaryApi } from './dictionary';

const dictionaryApi = new DictionaryApi({ token: 'bearer-token' });
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

describe('GET /dictionary/:word', () => {
  test('api should return success response', async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(validResponse),
        }) as Promise<Response>,
    );

    const dictionaryEntry = await dictionaryApi.fetch(searchWord);

    expect(dictionaryEntry).not.toBeNull();
    expect(dictionaryEntry?.dictionaryWord['name']).toBe('innocuous');
    expect(dictionaryEntry?.accessSummary).toMatchObject({
      totalAccess: 1,
      lastAccessAt: '2024-10-28T16:20:42.846Z',
    });
  });

  test('api should return error on invalid response', async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(invalidResponse),
        }) as Promise<Response>,
    );

    await expect(
      async () => await dictionaryApi.fetch(searchWord),
    ).rejects.toThrowError(InvalidResponseError);
  });

  test('api should return error if search-word is not found', async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({}), // Response should not matter
        }) as Promise<Response>,
    );

    await expect(
      async () => await dictionaryApi.fetch(searchWord),
    ).rejects.toThrowError(NotFoundError);
  });

  test('api should return error any other http status', async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({}), // Response should not matter
        }) as Promise<Response>,
    );

    await expect(
      async () => await dictionaryApi.fetch(searchWord),
    ).rejects.toThrowError(InternalServerError);
  });

  test('api should return authorization error if bearer-token is invalid', async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: false,
          status: 401,
          json: () => Promise.resolve({}), // Response should not matter
        }) as Promise<Response>,
    );

    await expect(
      async () => await dictionaryApi.fetch(searchWord),
    ).rejects.toThrowError(AuthorizationError);
  });
});
