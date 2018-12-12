const noiseTypes = require('./seed_data/NoiseTypes.json');

exports.seed = function seedNoiseTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('noise_types')
    .del()
    .then(() =>
      Promise.all(
        noiseTypes.map(noiseType =>
          knex('noise_types').insert({
            noise_type: noiseType,
          }),
        ),
      ),
    );
};
