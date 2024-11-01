import { Inject, Injectable } from '@nestjs/common';
import { ManifestReader } from './general/manifest-reader.interface';

@Injectable()
export class AppService {
  private manifest: Record<string, any>;

  constructor(
    @Inject('ManifestReader') private manifestReader: ManifestReader,
  ) {
    this.manifest = manifestReader.read();
  }

  getAssetPath(asset: string): string {
    return this.manifest?.['files']?.[asset] || '';
  }
}
