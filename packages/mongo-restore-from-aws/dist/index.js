"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mongoRestoreFromAws;

const {
  exec
} = require('child_process');

const tmp = require('tmp');

function getTempPath() {
  return new Promise((resolve, reject) => {
    tmp.file({
      mode: 0o644
    }, (error, path, fd, cleanup) => {
      if (error) return reject(error);
      resolve({
        path,
        fd,
        cleanup
      });
    });
  });
}

function copyFromServer(source, destination) {
  return new Promise((resolve, reject) => {
    exec(`aws s3 cp ${source} ${destination}`, (error, stdout) => {
      if (error) {
        return reject(error);
      }

      resolve(stdout);
    });
  });
}

function restoreFromFile(baseUri, source) {
  return new Promise((resolve, reject) => {
    exec(`mongorestore --uri=${baseUri} --archive=${source} --gzip`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      resolve(stderr);
    });
  });
}

async function mongoRestoreFromAws(remotePath, baseUri = 'mongodb://127.0.0.1:27017') {
  const {
    path: source,
    cleanup
  } = await getTempPath();
  const copyOutput = await copyFromServer(remotePath, source);
  const restoreOutput = await restoreFromFile(baseUri, source);
  cleanup();
  return {
    source: remotePath,
    copyOutput,
    restoreOutput
  };
}

module.exports = exports.default;