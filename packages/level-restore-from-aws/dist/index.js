"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = restoreLevelFromAws;

const tmp = require('tmp');

const zmqJsonRpcClient = require('zmq-json-rpc-client');

const {
  v4: uuidv4
} = require('uuid');

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

function restoreFromFile(serviceEndpoint, source) {
  return new Promise((resolve, reject) => {
    const rpcClient = zmqJsonRpcClient(serviceEndpoint, {
      timeout: 60 * 1000,
      nextId: uuidv4
    });
    rpcClient.emit('restore', {
      source
    }, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
}

function copyFromServer(source, destination) {
  return new Promise((resolve, reject) => {
    exec(`aws s3 cp ${source} ${destination}`, (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
}

async function restoreLevelFromAws(remotePath, serviceEndpoint) {
  const {
    path: source,
    cleanup
  } = await getTempPath();
  await copyFromServer(remotePath, source);
  await restoreFromFile(serviceEndpoint, source);
  cleanup();
  return {
    source: remotePath
  };
}

module.exports = exports.default;