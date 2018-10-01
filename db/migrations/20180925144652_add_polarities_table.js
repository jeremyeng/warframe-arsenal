exports.up = function addPolaritiesTableUp(knex) {
  return knex.schema.hasTable('polarities').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('polarities', (table) => {
          table.string('polarity').primary();
        });
    }
  });
};

exports.down = function addPolaritiesTableDown(knex) {
  return knex.schema.dropTableIfExists('polarities');
};
