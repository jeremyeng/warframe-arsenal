const warframes = require('./seed_data/Warframes.json');

exports.seed = function seedWarframesDev(knex, Promise) {
  // Deletes ALL existing entries

  return knex.transaction(trx =>
    trx(knex.ref('warframes').withSchema('warframe_arsenal_public'))
      .del()
      .then(() =>
        Promise.all(
          warframes.map(warframe =>
            trx(knex.ref('buildables').withSchema('warframe_arsenal_public'))
              .insert({ buildable_type: 'Warframe' })
              .returning('buildable_id')
              .then(([buildableId]) =>
                trx(
                  knex.ref('warframes').withSchema('warframe_arsenal_public'),
                ).insert({
                  buildable_id: buildableId,
                  warframe: warframe.name,
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
                }),
              ),
          ),
        ),
      ),
  );
};
