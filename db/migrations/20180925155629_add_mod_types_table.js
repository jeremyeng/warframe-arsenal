exports.up = function addModTypesTableUp(knex) {
  return knex.schema.hasTable('mod_types').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('mod_types', (table) => {
          table.integer('mod_type_id').primary();
          table.string('mod_type').notNullable().unique();
        });
    }
  });
};

exports.down = function addModTypesTableDown(knex) {
  return knex.schema.dropTableIfExists('mod_types');
};
