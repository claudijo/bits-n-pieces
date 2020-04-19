const levelBackup = require('@claudijo/level-backup');

export function backup(db) {
  return async (params, reply) => {
    const { destination } = params;

    try {
      await levelBackup.backup(db, destination);
      reply(null, true);
    } catch (error) {
      reply(error);
    }
  };
}

export function restore(db) {
  return async (params, reply) => {
    const { source } = params;
    try {
      await levelBackup.restore(db, source);
      reply(null, true);
    } catch (error) {
      reply(error);
    }
  };
}
