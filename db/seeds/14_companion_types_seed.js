const companionTypes = require('./seed_data/CompanionTypes.json');

exports.seed = function seedCompanionTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('companion_types')
    .del()
    .then(() => Promise.all(
      companionTypes.map(companionType => knex('companion_types').insert({
        companion_type: companionType,
      })),
    ));
};
