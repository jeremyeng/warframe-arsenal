exports.up = function addPolaritiesTableUp(knex) {
  return knex.schema.hasTable('polarities').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('polarities', (t) => {
          t.increments('polarity_id').primary();
          t.string('polarity').notNullable().unique();
        });
    }
  });
};

exports.down = function addPolaritiesTableDown(knex) {
  return knex.schema.dropTableIfExists('polarities');
};
