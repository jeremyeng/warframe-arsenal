exports.up = function(knex) {
  return knex.schema.raw(
    `CREATE ROLE postgraphile LOGIN PASSWORD '${
      process.env.POSTGRAPHILE_DATBASE_PASSWORD
    }'`,
  );
};

exports.down = function(knex) {
  return knex.schema.raw(`DROP ROLE IF EXISTS postgraphile;`);
};
