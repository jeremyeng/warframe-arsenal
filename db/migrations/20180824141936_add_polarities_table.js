exports.up = function addPolaritiesTableUp(knex) {
  return knex.schema.hasTable('polarities').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('polarities', (t) => {
          t.increments('polarity_id').primary();
          t.string('polarity_name').notNullable();
        })
        .then(() => knex('polarities').insert([
          { polarity_name: 'madurai' },
          { polarity_name: 'zenurik' },
          { polarity_name: 'vazarin' },
          { polarity_name: 'unairu' },
          { polarity_name: 'naramon' },
          { polarity_name: 'penjaga' },
          { polarity_name: 'umbra' },
        ]));
    }
  });
};

exports.down = function addPolaritiesTableDown(knex) {
  return knex.schema.dropTableIfExists('polarities');
};
