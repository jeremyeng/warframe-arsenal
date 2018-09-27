exports.up = function addBuildablesTableUp(knex) {
  return knex.schema.hasTable('buildables').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('buildables', (table) => {
          table.specificType('buildable_id', 'serial');
          table.integer('buildable_type_id')
            .references('buildable_type_id')
            .inTable('buildable_types')
            .onUpdate('CASCADE');
          table.primary(['buildable_id', 'buildable_type_id']);
        });
    }
  });
};

exports.down = function addBuildablesTableDown(knex) {
  return knex.schema.dropTableIfExists('buildables');
};
