const mods = require('../seed_data/Mods.json');

exports.seed = function seedModsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mods')
    .del()
    .then(() => Promise.all(
      mods.map(mod => knex('mods').insert({
        mod: mod.name,
        description: mod.description,
        base_drain: mod.baseDrain,
        fusion_limit: mod.fusionLimit,
        data: mod.stats,
        type: mod.type,
        image_name: mod.imageName,
        polarity: mod.polarity.toLowerCase(),
      })),
    ));
};
