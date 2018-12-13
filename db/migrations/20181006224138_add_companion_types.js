exports.up = function addCompanionTypesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('companion_types')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('companion_types', table => {
            table.string('companion_type').primary();
          });
      }
    });
};

exports.down = function addWeaponTypesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('companion_types');
};
