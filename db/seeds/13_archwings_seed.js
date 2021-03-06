const archwings = require('./seed_data/Archwing.json');

exports.seed = function seedArchwingsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('archwings').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        archwings.map(archwing =>
          knex(knex.ref('buildables').withSchema('warframe_arsenal_public'))
            .insert({ buildable_type: 'Archwing' })
            .returning('buildable_id')
            .then(([buildableId]) =>
              knex(
                knex.ref('archwings').withSchema('warframe_arsenal_public'),
              ).insert({
                buildable_id: buildableId,
                archwing: archwing.name,
                description: archwing.description,
                health: archwing.health,
                shield: archwing.shield,
                armor: archwing.armor,
                energy: archwing.power,
                wikia_url: archwing.wikiaUrl,
                image_name: archwing.imageName,
              }),
            ),
        ),
      ),
    );
};
