exports.up = function addBuildableTypesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('buildable_types')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('buildable_types', table => {
            table.string('buildable_type').primary();
          });
      }
    });
};

exports.down = function addBuildableTypesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('buildable_types');
};
