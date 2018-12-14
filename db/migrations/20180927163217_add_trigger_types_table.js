exports.up = function addTriggerTypesTableUp(knex) {
  return knex.schema.hasTable('trigger_types').then(exists => {
    if (!exists) {
      return knex.schema.createTable('trigger_types', table => {
        table.string('trigger_type').primary();
      });
    }
  });
};

exports.down = function addTriggerTypesTableDown(knex) {
  return knex.schema.dropTableIfExists('trigger_types');
};
