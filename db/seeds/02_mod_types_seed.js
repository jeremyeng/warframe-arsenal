const modTypes = require('./seed_data/ModTypes.json');

exports.seed = function seedModsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mod_types')
    .del()
    .then(() => Promise.all(
      modTypes.map(modType => knex('mod_types').insert({
        mod_type: modType,
      })),
    ));
};