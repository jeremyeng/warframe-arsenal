exports.up = function addModSetsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('mod_sets')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('mod_sets', table => {
            table.string('mod_set').primary();
            table.string('description').notNullable();
            table
              .jsonb('data')
              .defaultTo('[]')
              .notNullable();
          });
      }
    });
};

exports.down = function addModSetsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('mod_sets');
};
