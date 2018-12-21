const companions = require('./seed_data/Companions.json');

exports.seed = function seedCompanionsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('companions').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        companions.map(companion =>
          knex(knex.ref('buildables').withSchema('warframe_arsenal_public'))
            .insert({ buildable_type: 'Companion' })
            .returning('buildable_id')
            .then(([buildableId]) =>
              knex(
                knex.ref('companions').withSchema('warframe_arsenal_public'),
              ).insert({
                buildable_id: buildableId,
                companion: companion.name,
                companion_type: companion.type,
                description: companion.description,
                health: companion.health,
                shield: companion.shield,
                armor: companion.armor,
                energy: companion.power,
                wikia_url: companion.wikiaUrl,
                image_name: companion.imageName,
              }),
            ),
        ),
      ),
    );
};
