import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  private manifest: Record<string, any>;

  constructor() {
    this.loadManifest();
  }

  private loadManifest() {
    const manifestPath = path.join(
      __dirname,
      '..',
      'public/asset-manifest.json',
    );
    this.manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  }

  getAssetPath(asset: string): string {
    return this.manifest?.['files']?.[asset] || '';
  }
}
