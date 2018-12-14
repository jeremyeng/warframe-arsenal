exports.up = function addProjectileTypesTableUp(knex) {
  return knex.schema.hasTable('projectile_types').then(exists => {
    if (!exists) {
      return knex.schema.createTable('projectile_types', table => {
        table.string('projectile_type').primary();
      });
    }
  });
};

exports.down = function addProjectileTypesTableDown(knex) {
  return knex.schema.dropTableIfExists('projectile_types');
};
