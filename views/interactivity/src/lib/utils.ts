import pako from 'pako';

export class Utils {
  decodeBase64Gzip(base64String: string) {
    const binaryData = Uint8Array.from(atob(base64String), (c) =>
      c.charCodeAt(0),
    );
    return pako.inflate(binaryData, { to: 'string' });
  }
}
