const knexMigrate = require('knex-migrate');

module.exports = async () => {
  await knexMigrate('down', { to: 0 });
  await knexMigrate('up', {});
};
