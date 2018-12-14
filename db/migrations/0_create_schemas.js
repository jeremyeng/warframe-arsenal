exports.up = function(knex) {
  return knex.raw(`
    CREATE SCHEMA warframe_arsenal_public;
    CREATE SCHEMA warframe_arsenal_private;
    SET search_path TO warframe_arsenal_public, public;
  `);
};

exports.down = function(knex) {
  return knex.raw(`
    DROP SCHEMA warframe_arsenal_public CASCADE;
    DROP SCHEMA warframe_arsenal_private CASCADE;
  `);
};
