const { exec } = require('child_process');
const tmp = require('tmp');

function getTempPath() {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    tmp.file({ mode: 0o644 }, (error, path, fd, cleanup) => {
      if (error) return reject(error);
      resolve({ path, fd, cleanup });
    });
  });
}

function copyFromServer(source, destination) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    exec(`aws s3 cp ${source} ${destination}`, (error, stdout /* , stderr */) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout);
    });
  });
}

function restoreFromFile(baseUri, source) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    exec(`mongorestore --uri=${baseUri} --archive=${source} --gzip`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      // Mongorestore writes debug to stderr(!)
      resolve(stderr);
    });
  });
}

export default async function mongoRestoreFromAws(remotePath, baseUri = 'mongodb://127.0.0.1:27017') {
  const { path: source, cleanup } = await getTempPath();

  const copyOutput = await copyFromServer(remotePath, source);
  const restoreOutput = await restoreFromFile(baseUri, source);

  cleanup();

  return { source: remotePath, copyOutput, restoreOutput };
}
