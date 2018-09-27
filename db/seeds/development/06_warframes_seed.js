const warframes = require('../seed_data/Warframes.json');

exports.seed = function seedModsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('warframes')
    .del()
    .then(() => Promise.all(
      warframes.map(warframe => knex('buildables')
        .insert({ buildable_type_id: 1 })
        .returning('buildable_id')
        .then(([buildableId]) => knex('warframes').insert({
          buildable_id: buildableId,
          name: warframe.name,
          description: warframe.description,
          health: warframe.health,
          shield: warframe.shield,
          armor: warframe.armor,
          energy: warframe.power,
          sprint_speed: warframe.sprint,
          mastery_requirement: warframe.masteryReq,
          aura_polarity: warframe.aura,
          wikia_url: warframe.wikiaUrl,
          image_name: warframe.imageName,
        }))),
    ));
};
