exports.up = function addBuildablesTableUp(knex) {
  return knex.schema.hasTable('buildables').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('buildables', (table) => {
          table.specificType('buildable_id', 'serial');
          table.string('buildable_type')
            .references('buildable_type')
            .inTable('buildable_types')
            .onUpdate('CASCADE');
          table.primary(['buildable_id', 'buildable_type']);
        });
    }
  });
};

exports.down = function addBuildablesTableDown(knex) {
  return knex.schema.dropTableIfExists('buildables');
};
