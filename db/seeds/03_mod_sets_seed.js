const modSets = require('./seed_data/ModSets.json');

exports.seed = function seedModsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mod_sets')
    .del()
    .then(() =>
      Promise.all(
        modSets.map(modSet =>
          knex('mod_sets').insert({
            mod_set: modSet.mod_set,
            description: modSet.description,
            data: JSON.stringify(modSet.data),
          }),
        ),
      ),
    );
};
