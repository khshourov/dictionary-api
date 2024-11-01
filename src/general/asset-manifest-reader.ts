import { ManifestReader } from './manifest-reader.interface';
import * as fs from 'fs';

export class AssetManifestReader implements ManifestReader {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  read(): any {
    return JSON.parse(fs.readFileSync(this.path, 'utf8'));
  }
}
