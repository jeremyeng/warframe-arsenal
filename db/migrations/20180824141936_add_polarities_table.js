exports.up = function addPolaritiesTableUp(knex) {
  return knex.schema.hasTable('polarities').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('polarities', (t) => {
          t.increments('polarity_id').primary();
          t.string('name').notNullable().unique();
        })
        .then(() => knex('polarities').insert([
          { name: 'madurai' },
          { name: 'zenurik' },
          { name: 'vazarin' },
          { name: 'unairu' },
          { name: 'naramon' },
          { name: 'penjaga' },
          { name: 'umbra' },
        ]));
    }
  });
};

exports.down = function addPolaritiesTableDown(knex) {
  return knex.schema.dropTableIfExists('polarities');
};
