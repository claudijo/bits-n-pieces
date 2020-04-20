"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = folderBackupToAws;

const tmp = require('tmp');

const {
  exec
} = require('child_process');

function getTempPath() {
  return new Promise((resolve, reject) => {
    tmp.file({
      mode: 0o644,
      discardDescriptor: true
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

function zeroPad(num, length = 2) {
  return num.toString().padStart(length, '0');
}

function getTimestampedFileName(suffix = 'folder.tar.gz') {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = zeroPad(date.getUTCMonth() + 1);
  const day = zeroPad(date.getUTCDate());
  const hours = zeroPad(date.getUTCHours());
  const minutes = zeroPad(date.getUTCMinutes());
  const seconds = zeroPad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}.${suffix}`;
}

function copyToServer(source, destination) {
  return new Promise((resolve, reject) => {
    exec(`aws s3 cp ${source} ${destination}`, (error, stdout) => {
      if (error) {
        return reject(error);
      }

      resolve(stdout);
    });
  });
}

function archive(folder, destination) {
  return new Promise((resolve, reject) => {
    exec(`tar -zcvf ${destination} *`, {
      cwd: folder
    }, (error, stdout) => {
      if (error) {
        return reject(error);
      }

      resolve(stdout);
    });
  });
}

async function folderBackupToAws(bucket, folder, suffix = 'folder.tar.gz', incrementalFilename = true) {
  const {
    path: source,
    cleanup
  } = await getTempPath();
  const destination = `${bucket}/${incrementalFilename ? getTimestampedFileName(suffix) : suffix}`;
  const dumpOutput = await archive(folder, source);
  const copyOutput = await copyToServer(source, destination);
  cleanup();
  return {
    destination,
    source,
    dumpOutput,
    copyOutput
  };
}

module.exports = exports.default;