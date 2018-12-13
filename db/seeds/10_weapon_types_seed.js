const weaponTypes = require('./seed_data/WeaponTypes.json');

exports.seed = function seedWeaponTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('weapon_types').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        weaponTypes.map(weaponType =>
          knex(
            knex.ref('weapon_types').withSchema('warframe_arsenal_public'),
          ).insert({
            weapon_type: weaponType,
          }),
        ),
      ),
    );
};
