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

function zeroPad(num, length = 2) {
  return num.toString().padStart(length, '0');
}

function backupToFile(db, destination) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    exec(`mongodump --db=${db} --archive=${destination} --gzip`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      // Mongodump writes debug to stderr(!)
      resolve(stderr);
    });
  });
}

function getTimestampedFileName(suffix = 'mongo.gz') {
  const date = new Date();

  const year = date.getUTCFullYear();
  const month = zeroPad((date.getUTCMonth() + 1));
  const day = zeroPad(date.getUTCDate());
  const hours = zeroPad(date.getUTCHours());
  const minutes = zeroPad(date.getUTCMinutes());
  const seconds = zeroPad(date.getUTCSeconds());


  return `${year}${month}${day}T${hours}${minutes}${seconds}.${suffix}`;
}

function copyToServer(source, destination) {
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

export default async function mongoBackupToAws(bucket, db) {
  const { path: source, cleanup } = await getTempPath();
  const destination = `${bucket}/${getTimestampedFileName()}`;

  const dumpOutput = await backupToFile(db, source);
  const copyOutput = await copyToServer(source, destination);

  cleanup();

  return {
    destination, source, dumpOutput, copyOutput,
  };
}