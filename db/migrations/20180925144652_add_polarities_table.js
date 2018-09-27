exports.up = function addPolaritiesTableUp(knex) {
  return knex.schema.hasTable('polarities').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('polarities', (table) => {
          table.increments('polarity_id').primary();
          table.string('polarity').notNullable().unique();
        });
    }
  });
};

exports.down = function addPolaritiesTableDown(knex) {
  return knex.schema.dropTableIfExists('polarities');
};
