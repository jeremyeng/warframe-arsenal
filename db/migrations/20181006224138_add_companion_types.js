exports.up = function addCompanionTypesTableUp(knex) {
  return knex.schema.hasTable('companion_types').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('companion_types', (table) => {
        table
          .string('companion_type')
          .primary();
      });
    }
  });
};

exports.down = function addWeaponTypesTableDown(knex) {
  return knex.schema.dropTableIfExists('companion_types');
};
