exports.up = function addWeaponTypesTableUp(knex) {
  return knex.schema.hasTable('weapon_types').then(exists => {
    if (!exists) {
      return knex.schema.createTable('weapon_types', table => {
        table.string('weapon_type').primary();
      });
    }
  });
};

exports.down = function addWeaponTypesTableDown(knex) {
  return knex.schema.dropTableIfExists('weapon_types');
};
