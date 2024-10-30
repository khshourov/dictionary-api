import { gzip } from 'zlib';
import { Utils } from './utils';

const utils = new Utils();

const compress = (text: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    gzip(text, { level: 1 }, (err, compressedText) => {
      if (err) {
        return reject(err);
      }

      return resolve(compressedText.toString('base64'));
    });
  });
};

describe('decodeBase64Gzip()', () => {
  test('decompress previously base64 encoded compressed text', async () => {
    const compressed = await compress('some text');

    const uncompressed = utils.decodeBase64Gzip(compressed);

    expect(uncompressed).toBe('some text');
  });
});

describe('iso8601ToDateTime()', () => {
  test('function should return datetime string when iso-8601 datetime string is given', () => {
    expect(utils.iso8601ToDateTime('2024-01-01T00:00:00.000Z')).toBe(
      '2024-01-01 00:00:00',
    );
  });

  test('function should return datetime string when datetime object is given', () => {
    expect(utils.iso8601ToDateTime(new Date('2024-01-01T00:00:00.000Z'))).toBe(
      '2024-01-01 00:00:00',
    );
  });
});
