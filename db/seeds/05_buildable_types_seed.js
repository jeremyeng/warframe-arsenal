const buildableTypes = require('./seed_data/BuildableTypes.json');

exports.seed = function seedBuildableTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('buildable_types').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        buildableTypes.map(buildableType =>
          knex(
            knex.ref('buildable_types').withSchema('warframe_arsenal_public'),
          ).insert({
            buildable_type: buildableType,
          }),
        ),
      ),
    );
};
