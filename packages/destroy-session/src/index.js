async function destroySession(req) {
  return new Promise((resolve, reject) => {
    req.session.destroy(error => {
      if (error) return reject(error);
      resolve();
    });
  });
}

module.exports = destroySession;