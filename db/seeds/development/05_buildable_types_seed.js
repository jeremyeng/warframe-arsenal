const buildableTypes = require('../seed_data/BuildableTypes.json');

exports.seed = function seedBuildableTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('buildable_types')
    .del()
    .then(() => Promise.all(
      buildableTypes.map(({ buildableTypeId, buildableType }) => knex('buildable_types').insert({
        buildable_type_id: buildableTypeId,
        buildable_type: buildableType,
      })),
    ));
};
