exports.up = function addTriggerTypesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('trigger_types')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('trigger_types', table => {
            table.string('trigger_type').primary();
          });
      }
    });
};

exports.down = function addTriggerTypesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('trigger_types');
};
