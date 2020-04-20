"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mongoBackupToAws;

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

function zeroPad(num, length = 2) {
  return num.toString().padStart(length, '0');
}

function backupToFile(db, destination) {
  return new Promise((resolve, reject) => {
    exec(`mongodump --db=${db} --archive=${destination} --gzip`, (error, stdout) => {
      if (error) {
        return reject(error);
      }

      resolve(stdout);
    });
  });
}

function getTimestampedFileName(suffix = 'mongo.gz') {
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
    exec(`aws s3 cp ${source} ${destination}`, (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
}

async function mongoBackupToAws(bucket, db) {
  const {
    path: source,
    cleanup
  } = await getTempPath();
  const destination = `${bucket}/${getTimestampedFileName()}`;
  const output = await backupToFile(db, source);
  await copyToServer(source, destination);
  cleanup();
  return {
    destination,
    source,
    output
  };
}

module.exports = exports.default;