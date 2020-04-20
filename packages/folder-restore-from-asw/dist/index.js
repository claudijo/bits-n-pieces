"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = folderRestoreFromAws;

const tmp = require('tmp');

const {
  exec
} = require('child_process');

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

function restoreFromArchive(folder, source) {
  return new Promise((resolve, reject) => {
    exec(`tar -zxvf ${source} -C ${folder}`, (error, stdout) => {
      if (error) {
        return reject(error);
      }

      resolve(stdout);
    });
  });
}

async function folderRestoreFromAws(remotePath, folder) {
  const {
    path: source,
    cleanup
  } = await getTempPath();
  const copyOutput = await copyFromServer(remotePath, source);
  const restoreOutput = await restoreFromArchive(folder, source);
  cleanup();
  return {
    source: remotePath,
    copyOutput,
    restoreOutput
  };
}

module.exports = exports.default;