const sentinels = require('./seed_data/Sentinels.json');

exports.seed = function seedSentinelsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('sentinels').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        sentinels.map(sentinel =>
          knex(knex.ref('buildables').withSchema('warframe_arsenal_public'))
            .insert({ buildable_type: 'Sentinel' })
            .returning('buildable_id')
            .then(([buildableId]) =>
              knex(
                knex.ref('sentinels').withSchema('warframe_arsenal_public'),
              ).insert({
                buildable_id: buildableId,
                sentinel: '',
                description: sentinel.description,
                health: sentinel.health,
                shield: sentinel.shield,
                armor: sentinel.armor,
                energy: sentinel.power,
                wikia_url: sentinel.wikiaUrl,
                image_name: sentinel.imageName,
              }),
            ),
        ),
      ),
    );
};
