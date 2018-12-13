const mods = require('./seed_data/Mods.json');

exports.seed = function seedModsDev(knex, Promise) {
  // Deletes ALL existing entries

  return knex.transaction(trx =>
    Promise.all(
      mods.map(mod =>
        trx(trx.ref('mods').withSchema('warframe_arsenal_public'))
          .del()
          .insert({
            mod: mod.name,
            description: mod.description,
            base_drain: mod.baseDrain,
            fusion_limit: mod.fusionLimit,
            data: mod.stats,
            mod_type: mod.type,
            image_name: mod.imageName,
            polarity: mod.polarity.toLowerCase(),
          }),
      ),
    ),
  );
};
