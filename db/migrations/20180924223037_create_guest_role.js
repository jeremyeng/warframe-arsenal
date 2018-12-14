exports.up = function(knex) {
  return knex.schema.raw(
    `
    CREATE ROLE guest; 
    GRANT guest TO postgraphile;
    GRANT usage ON SCHEMA warframe_arsenal_public TO guest;
    `,
  );
};

exports.down = function(knex) {
  return knex.schema.raw(
    `
    REVOKE usage ON SCHEMA warframe_arsenal_public FROM guest;
    REVOKE guest FROM postgraphile;
    DROP ROLE IF EXISTS guest;
    `,
  );
};
