exports.up = function(knex) {
  return knex.schema.raw(
    `
    CREATE ROLE admin; 
    GRANT admin TO postgraphile;
    GRANT usage ON SCHEMA warframe_arsenal_public TO admin;
    `,
  );
};

exports.down = function(knex) {
  return knex.schema.raw(
    `
    REVOKE usage ON SCHEMA warframe_arsenal_public FROM admin;
    REVOKE admin FROM postgraphile;
    DROP ROLE IF EXISTS admin;
    `,
  );
};
