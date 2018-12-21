const companionTypes = require('./seed_data/CompanionTypes.json');

exports.seed = function seedCompanionTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('companion_types').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        companionTypes.map(companionType =>
          knex(
            knex.ref('companion_types').withSchema('warframe_arsenal_public'),
          ).insert({
            companion_type: companionType,
          }),
        ),
      ),
    );
};
