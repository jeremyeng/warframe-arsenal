const triggerTypes = require('./seed_data/TriggerTypes.json');

exports.seed = function seedtriggerTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trigger_types')
    .del()
    .then(() => Promise.all(
      triggerTypes.map(triggerType => knex('trigger_types').insert({
        trigger_type: triggerType,
      })),
    ));
};
