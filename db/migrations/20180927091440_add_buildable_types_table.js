exports.up = function addBuildablesTableUp(knex) {
  return knex.schema.hasTable('buildable_types').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('buildable_types', (table) => {
        table.integer('buildable_type_id').primary();
        table.string('buildable_type')
          .notNullable()
          .unique();
      });
    }
  });
};

exports.down = function addModsTableDown(knex) {
  return knex.schema.dropTableIfExists('buildable_types');
};
