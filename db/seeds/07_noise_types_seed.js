const noiseTypes = require('./seed_data/NoiseTypes.json');

exports.seed = function seedNoiseTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('noise_types').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        noiseTypes.map(noiseType =>
          knex(
            knex.ref('noise_types').withSchema('warframe_arsenal_public'),
          ).insert({
            noise_type: noiseType,
          }),
        ),
      ),
    );
};
