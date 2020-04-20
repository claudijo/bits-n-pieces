const tmp = require('tmp');
const zmqJsonRpcClient = require('zmq-json-rpc-client');
const { v4: uuidv4 } = require('uuid');
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

function zeroPad(num, length = 2) {
  return num.toString().padStart(length, '0');
}

function getTimestampedFileName(suffix = 'level.json.gz') {
  const date = new Date();

  const year = date.getUTCFullYear();
  const month = zeroPad((date.getUTCMonth() + 1));
  const day = zeroPad(date.getUTCDate());
  const hours = zeroPad(date.getUTCHours());
  const minutes = zeroPad(date.getUTCMinutes());
  const seconds = zeroPad(date.getUTCSeconds());


  return `${year}${month}${day}T${hours}${minutes}${seconds}.${suffix}`;
}

function backupToFile(serviceEndpoint, destination) {
  return new Promise((resolve, reject) => {
    const rpcClient = zmqJsonRpcClient(serviceEndpoint, {
      timeout: 60 * 1000, // Should be sufficient to wait for service restarts
      nextId: uuidv4,
    });

    // eslint-disable-next-line consistent-return
    rpcClient.emit('backup', { destination }, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
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

export default async function backupLevelToAws(bucket, serviceEndpoint) {
  const { path: source, cleanup } = await getTempPath();
  const destination = `${bucket}/${getTimestampedFileName()}`;

  const dumpOutput = await backupToFile(serviceEndpoint, source);
  const copyOutput = await copyToServer(source, destination);

  cleanup();

  return {
    destination, source, dumpOutput, copyOutput,
  };
}
