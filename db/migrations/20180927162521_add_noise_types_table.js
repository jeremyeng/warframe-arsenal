exports.up = function addNoiseTypesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('noise_types')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('noise_types', table => {
            table.string('noise_type').primary();
          });
      }
    });
};

exports.down = function addNoiseTypesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('noise_types');
};
