const knex = require('../db/knex');

module.exports = async () => {
  await knex.destroy();
  // eslint-disable-next-line no-process-exit
  process.exit();
};
