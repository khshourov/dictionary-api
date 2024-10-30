import { Utils } from '../../lib/utils';
import { AuthorizationError } from '../../error/authorization';
import { InternalServerError } from '../../error/server';
import { NotFoundError } from '../../error/not-found';
import { lexicalEntrySchema, responseSchema } from './dictionary.validator';
import { InvalidResponseError } from '../../error/invalid-response';
import { DictionaryEntry } from '../types';

export class DictionaryApi {
  private token: string;
  private utils: Utils;

  constructor(options: { token: string }) {
    this.token = options.token;
    this.utils = new Utils();
  }

  async fetch(searchWord: string): Promise<DictionaryEntry> {
    const response = await fetch(
      `${process.env.APP_BASE_URL}/dictionary/${searchWord}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthorizationError();
      } else if (response.status === 404) {
        throw new NotFoundError();
      } else {
        throw new InternalServerError();
      }
    }

    const data = await response.json();
    const isResponseValid = await responseSchema.isValid(data);
    if (!isResponseValid) {
      throw new InvalidResponseError();
    }

    data.dictionaryWord = JSON.parse(
      this.utils.decodeBase64Gzip(data.dictionaryWord.lexicalEntry),
    );
    const isDictionaryWordValid = await lexicalEntrySchema.isValid(
      data.dictionaryWord,
    );
    if (!isDictionaryWordValid) {
      throw new InvalidResponseError();
    }

    return data as unknown as DictionaryEntry;
  }
}
