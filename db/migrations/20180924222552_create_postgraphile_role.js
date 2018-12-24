exports.up = function(knex) {
  return knex.schema.raw(`CREATE ROLE postgraphile LOGIN PASSWORD 'tenno'`);
};

exports.down = function(knex) {
  return knex.schema.raw(`DROP ROLE IF EXISTS postgraphile;`);
};
