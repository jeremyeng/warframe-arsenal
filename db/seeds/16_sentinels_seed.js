const sentinels = require('./seed_data/Sentinels.json');

exports.seed = function seedSentinelsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('sentinels'))
    .del()
    .then(() =>
      Promise.all(
        sentinels.map(sentinel =>
          knex(knex.ref('buildables'))
            .insert({ buildable_type: 'Sentinel' })
            .returning('buildable_id')
            .then(([buildableId]) =>
              knex(knex.ref('sentinels')).insert({
                buildable_id: buildableId,
                sentinel: sentinel.name,
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
