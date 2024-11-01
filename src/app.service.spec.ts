import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { ManifestReader } from './general/manifest-reader.interface';

class FakeAssetManifestReader implements ManifestReader {
  read() {
    return {
      files: {
        'main.css': '/static/css/main.cc36ea67.css',
        'main.js': '/static/js/main.3503c318.js',
        'static/media/icons.svg':
          '/static/media/icons.91ebdb492a77b70948d8f02b3bc2c2be.svg',
        'index.html': '/index.html',
        'main.cc36ea67.css.map': '/static/css/main.cc36ea67.css.map',
        'main.3503c318.js.map': '/static/js/main.3503c318.js.map',
      },
      entrypoints: [
        'static/css/main.cc36ea67.css',
        'static/js/main.3503c318.js',
      ],
    };
  }
}

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: 'ManifestReader',
          useFactory: () => new FakeAssetManifestReader(),
        },
        AppService,
      ],
    }).compile();

    appService = app.get(AppService);
  });

  describe('getAssetPath()', () => {
    it('should return if asset is present in the manifest file', () => {
      expect(appService.getAssetPath('main.js')).toBe(
        '/static/js/main.3503c318.js',
      );
    });

    it('should return empty if asset is not present in the manifest file', () => {
      expect(appService.getAssetPath('index.js')).toBe('');
    });
  });
});
