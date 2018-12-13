exports.up = function addWeaponCategoriesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('weapon_categories')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('weapon_categories', table => {
            table.string('weapon_category').primary();
          });
      }
    });
};

exports.down = function addWeaponCategoriesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('weapon_categories');
};
