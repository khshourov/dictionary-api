import pako from 'pako';

export class Utils {
  decodeBase64Gzip(base64String: string) {
    const binaryData = Uint8Array.from(atob(base64String), (c) =>
      c.charCodeAt(0),
    );
    return pako.inflate(binaryData, { to: 'string' });
  }

  iso8601ToDate(iso8601: string | Date) {
    if (iso8601 instanceof Date) {
      iso8601 = iso8601.toISOString();
    }
    // iso 8601: YYYY-MM-DDThh:mm:ss.SSSZ
    return iso8601.split('T')[0];
  }
}
