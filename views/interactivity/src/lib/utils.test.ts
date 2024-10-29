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
