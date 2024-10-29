import { Utils } from '../../lib/utils';
import { DictionaryEntry } from '../../types';
import { AuthorizationError } from '../../error/authorization';
import { InternalServerError } from '../../error/server';
import { NotFoundError } from '../../error/not-found';

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
    data.dictionaryWord = JSON.parse(
      this.utils.decodeBase64Gzip(data.dictionaryWord.lexicalEntry),
    );

    return data as unknown as DictionaryEntry;
  }
}
