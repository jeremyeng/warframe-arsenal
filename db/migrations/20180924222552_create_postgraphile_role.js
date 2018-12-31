exports.up = function(knex) {
  return knex.schema.raw(
    `CREATE ROLE postgraphile LOGIN PASSWORD '${
      process.env.POSTGRAPHILE_DATABASE_PASSWORD
    }'`,
  );
};

exports.down = function(knex) {
  return knex.schema.raw(`DROP ROLE IF EXISTS postgraphile;`);
};
