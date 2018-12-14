exports.up = function(knex) {
  return knex.raw(`
    CREATE SCHEMA warframe_arsenal_public;
    CREATE SCHEMA warframe_arsenal_private;
    SET search_path TO warframe_arsenal_public, public;
    ALTER DEFAULT privileges REVOKE EXECUTE ON functions FROM public;
  `);
};

exports.down = function(knex) {
  return knex.raw(`
    DROP SCHEMA warframe_arsenal_public CASCADE;
    DROP SCHEMA warframe_arsenal_private CASCADE;
  `);
};
