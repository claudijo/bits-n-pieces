const tmp = require('tmp');
const { exec } = require('child_process');

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

function restoreFromArchive(folder, source) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    exec(`tar -zxvf ${source} -C ${folder}`, (error, stdout /* , stderr */) => {
      if (error) {
        return reject(error);
      }

      resolve(stdout);
    });
  });
}

export default async function folderRestoreFromAws(remotePath, folder) {
  const { path: source, cleanup } = await getTempPath();

  const copyOutput = await copyFromServer(remotePath, source);
  const restoreOutput = await restoreFromArchive(folder, source);

  cleanup();

  return { source: remotePath, copyOutput, restoreOutput };
}
