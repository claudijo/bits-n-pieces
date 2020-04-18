"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backup = backup;
exports.restore = restore;

const zlib = require('zlib');

const fs = require('fs');

const {
  Transform,
  pipeline
} = require('stream');

const readline = require('readline');

function backup(db, destination) {
  return new Promise((resolve, reject) => {
    const transform = new Transform({
      writableObjectMode: true,
      transform: function (chunk, encoding, done) {
        this.push(JSON.stringify(chunk) + '\n');
        done();
      }
    });
    pipeline(db.createReadStream(), transform, zlib.createGzip(), fs.createWriteStream(destination), err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function restore(db, source) {
  return new Promise(async (resolve, reject) => {
    const input = pipeline(fs.createReadStream(source), zlib.createGunzip(), error => {
      if (error) reject(error);
    });
    const rl = readline.createInterface({
      input
    });

    try {
      for await (const line of rl) {
        const {
          key,
          value
        } = JSON.parse(line);
        await db.put(key, value);
      }
    } catch (error) {
      return reject(error);
    }

    resolve();
  });
}