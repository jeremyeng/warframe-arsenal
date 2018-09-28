exports.up = function addWeaponCategoriesTableUp(knex) {
  return knex.schema.hasTable('weapon_categories').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('weapon_categories', (table) => {
        table
          .string('weapon_category')
          .primary();
      });
    }
  });
};

exports.down = function addWeaponCategoriesTableDown(knex) {
  return knex.schema.dropTableIfExists('weapon_categories');
};
