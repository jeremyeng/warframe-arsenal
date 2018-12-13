exports.up = function(knex) {
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
};

exports.down = function(knex) {
  knex.schema.raw('DROP EXTENSION IF EXISTS "pgcrypto";');
};
