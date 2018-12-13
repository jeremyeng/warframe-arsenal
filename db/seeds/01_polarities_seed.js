const polarities = require('./seed_data/Polarities.json');

exports.seed = function seedModsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('polarities')
    .del()
    .then(() =>
      Promise.all(
        polarities.map(polarity =>
          knex('polarities').insert({
            polarity,
          }),
        ),
      ),
    );
};
