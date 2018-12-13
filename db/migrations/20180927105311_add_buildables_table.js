exports.up = function addBuildablesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('buildables')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('buildables', table => {
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
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('buildables');
};
