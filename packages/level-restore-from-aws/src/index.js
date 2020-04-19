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

function restoreFromFile(serviceEndpoint, source) {
  return new Promise((resolve, reject) => {
    const rpcClient = zmqJsonRpcClient(serviceEndpoint, {
      timeout: 60 * 1000, // Should be sufficient to wait for service restarts
      nextId: uuidv4,
    });

    // eslint-disable-next-line consistent-return
    rpcClient.emit('restore', { source }, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function copyFromServer(source, destination) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    exec(`aws s3 cp ${source} ${destination}`, (error /* , stdout, stderr */) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

export default async function restoreLevelFromAws(remotePath, serviceEndpoint) {
  const { path: source, cleanup } = await getTempPath();

  await copyFromServer(remotePath, source);
  await restoreFromFile(serviceEndpoint, source);

  cleanup();

  return { source };
}
