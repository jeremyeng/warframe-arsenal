const warframes = require('../seed_data/Warframes.json');

exports.seed = function seedModsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('warframes')
    .del()
    .then(() => Promise.all(
      warframes.map(warframe => knex('warframes').insert({
        name: warframe.name,
        description: warframe.description || '',
        health: warframe.health,
        shield: warframe.shield,
        armor: warframe.armor,
        energy: warframe.power,
        sprint_speed: warframe.sprint,
        mastery_requirement: warframe.masteryReq,
        aura_polarity: warframe.aura === undefined ? null : warframe.aura,
        wikia_url: warframe.wikiaUrl,
        image_name: warframe.imageName,
      })),
    ));
};
