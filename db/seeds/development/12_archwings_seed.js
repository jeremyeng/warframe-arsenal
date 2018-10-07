const archwings = require('../seed_data/Archwing.json');

exports.seed = function seedArchwingsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('archwings')
    .del()
    .then(() => Promise.all(
      archwings.map(warframe => knex('buildables')
        .insert({ buildable_type: 'Archwing' })
        .returning('buildable_id')
        .then(([buildableId]) => knex('archwings').insert({
          buildable_id: buildableId,
          name: warframe.name,
          description: warframe.description,
          health: warframe.health,
          shield: warframe.shield,
          armor: warframe.armor,
          energy: warframe.power,
          wikia_url: warframe.wikiaUrl,
          image_name: warframe.imageName,
        }))),
    ));
};
