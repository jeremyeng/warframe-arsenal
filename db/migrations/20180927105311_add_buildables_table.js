exports.up = function addBuildablesTableUp(knex) {
  return knex.schema.hasTable('buildables').then(exists => {
    if (!exists) {
      return knex.schema.createTable('buildables', table => {
        table.increments('buildable_id').primary();
        table
          .string('buildable_type')
          .references('buildable_type')
          .inTable('buildable_types')
          .onUpdate('CASCADE');
        table.unique(['buildable_id', 'buildable_type']);
      });
    }
  });
};

exports.down = function addBuildablesTableDown(knex) {
  return knex.schema.dropTableIfExists('buildables');
};
