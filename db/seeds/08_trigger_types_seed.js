const triggerTypes = require('./seed_data/TriggerTypes.json');

exports.seed = function seedtriggerTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('trigger_types').withSchema('warframe_arsenal_public'))
    .del()
    .then(() =>
      Promise.all(
        triggerTypes.map(triggerType =>
          knex(
            knex.ref('trigger_types').withSchema('warframe_arsenal_public'),
          ).insert({
            trigger_type: triggerType,
          }),
        ),
      ),
    );
};
