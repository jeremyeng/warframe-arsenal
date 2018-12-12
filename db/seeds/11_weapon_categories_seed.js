const weaponCategories = require('./seed_data/WeaponCategories.json');

exports.seed = function seedWeaponCategoriesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('weapon_categories')
    .del()
    .then(() =>
      Promise.all(
        weaponCategories.map(weaponCategory =>
          knex('weapon_categories').insert({
            weapon_category: weaponCategory,
          }),
        ),
      ),
    );
};
