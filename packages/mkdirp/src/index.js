const mkdirp = require('mkdirp');

export default function(dir, opts) {
  return new Promise((resolve, reject) => {
    mkdirp(dir, opts, (err, made) => {
      if (err) return reject(err);

      resolve(made);
    });
  });
};