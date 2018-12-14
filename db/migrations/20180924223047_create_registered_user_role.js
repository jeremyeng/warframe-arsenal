exports.up = function(knex) {
  return knex.schema.raw(
    `
    CREATE ROLE registered_user; 
    GRANT registered_user TO postgraphile;
    GRANT usage ON SCHEMA warframe_arsenal_public TO registered_user;
    `,
  );
};

exports.down = function(knex) {
  return knex.schema.raw(
    `
    REVOKE usage ON SCHEMA warframe_arsenal_public FROM registered_user;
    REVOKE registered_user FROM postgraphile;
    DROP ROLE IF EXISTS registered_user;
    `,
  );
};
