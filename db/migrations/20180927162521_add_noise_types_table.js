exports.up = function addNoiseTypesTableUp(knex) {
  return knex.schema.hasTable('noise_types').then(exists => {
    if (!exists) {
      return knex.schema.createTable('noise_types', table => {
        table.string('noise_type').primary();
      });
    }
  });
};

exports.down = function addNoiseTypesTableDown(knex) {
  return knex.schema.dropTableIfExists('noise_types');
};
