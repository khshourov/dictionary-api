const { series, src, dest } = require('gulp');
const { exec } = require('child_process');

function buildUI(cb) {
  return exec('cd ./views/interactivity && yarn install && yarn ci', cb);
}

function copyUI() {
  return src([
    'views/interactivity/build/static/**/*',
    'views/interactivity/build/asset-manifest.json',
  ]).pipe(dest('public'));
}

function buildBackend(cb) {
  return exec('yarn build', cb);
}

exports.default = series([buildUI, copyUI, buildBackend]);
