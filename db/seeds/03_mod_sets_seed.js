const modSets = require('./seed_data/ModSets.json');

exports.seed = function seedModsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('mod_sets').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        modSets.map(modSet =>
          knex(
            knex.ref('mod_sets').withSchema('warframe_arsenal_public'),
          ).insert({
            mod_set: modSet.mod_set,
            description: modSet.description,
            data: JSON.stringify(modSet.data),
          }),
        ),
      ),
    );
};
