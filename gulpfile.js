const { series, src, dest } = require('gulp');
const { exec } = require('child_process');
const fs = require('fs');

function buildUI(cb) {
  return exec('cd ./views/interactivity && yarn install && yarn ci', cb);
}

function createPublicDirectory(cb) {
  fs.mkdir('public', { recursive: true }, cb);
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

exports.default = series([buildUI, createPublicDirectory, copyUI, buildBackend]);
