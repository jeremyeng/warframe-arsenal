const weaponCategories = require('./seed_data/WeaponCategories.json');

exports.seed = function seedWeaponCategoriesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(
    knex.ref('weapon_categories').withSchema('warframe_arsenal_public'),
  )
    .del()
    .then(() =>
      Promise.all(
        weaponCategories.map(weaponCategory =>
          knex(
            knex.ref('weapon_categories').withSchema('warframe_arsenal_public'),
          ).insert({
            weapon_category: weaponCategory,
          }),
        ),
      ),
    );
};
