const zlib = require('zlib');
const fs = require('fs');
const { Transform, pipeline } = require('stream');
const readline = require('readline');

export function backup(db, destination) {
  return new Promise((resolve, reject) => {
    const transform = new Transform({
      writableObjectMode: true,

      transform(chunk, encoding, done) {
        this.push(`${JSON.stringify(chunk)}\n`);
        done();
      },
    });

    pipeline(
      db.createReadStream(),
      transform,
      zlib.createGzip(),
      fs.createWriteStream(destination),
      // eslint-disable-next-line consistent-return
      (err) => {
        if (err) return reject(err);
        resolve();
      },
    );
  });
}

export function restore(db, source) {
  // eslint-disable-next-line no-async-promise-executor, consistent-return
  return new Promise(async (resolve, reject) => {
    const input = pipeline(
      fs.createReadStream(source),
      zlib.createGunzip(),
      (error) => {
        if (error) reject(error);
      },
    );

    const rl = readline.createInterface({ input });

    try {
      // eslint-disable-next-line no-restricted-syntax
      for await (const line of rl) {
        const { key, value } = JSON.parse(line);
        await db.put(key, value);
      }
    } catch (error) {
      return reject(error);
    }

    resolve();
  });
}
