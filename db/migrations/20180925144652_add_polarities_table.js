exports.up = function addPolaritiesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('polarities')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('polarities', table => {
            table.string('polarity').primary();
          });
      }
    });
};

exports.down = function addPolaritiesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('polarities');
};
