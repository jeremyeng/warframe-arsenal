const polarities = require('./seed_data/Polarities.json');

exports.seed = function seedModsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('polarities').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        polarities.map(polarity =>
          knex(
            knex.ref('polarities').withSchema('warframe_arsenal_public'),
          ).insert({
            polarity,
          }),
        ),
      ),
    );
};
