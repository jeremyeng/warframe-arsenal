exports.up = function addBuildableTypesTableUp(knex) {
  return knex.schema.hasTable('buildable_types').then(exists => {
    if (!exists) {
      return knex.schema.createTable('buildable_types', table => {
        table.string('buildable_type').primary();
      });
    }
  });
};

exports.down = function addBuildableTypesTableDown(knex) {
  return knex.schema.dropTableIfExists('buildable_types');
};
