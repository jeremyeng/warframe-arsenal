exports.up = function addProjectileTypesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('projectile_types')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('projectile_types', table => {
            table.string('projectile_type').primary();
          });
      }
    });
};

exports.down = function addProjectileTypesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('projectile_types');
};
