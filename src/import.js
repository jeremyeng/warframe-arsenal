import knex from '../db/knex';
import mods from '../lib/warframe-items/data/json/Mods.json';

const modPromises = mods.map((mod) => {
  if (mod.name && mod.description && mod.baseDrain && mod.fusionLimit) {
    return knex.raw(
      `
        INSERT INTO mods (mod_name, mod_description, base_drain, fusion_limit, type, image_name)
        VALUES (:mod_name, :mod_description, :base_drain, :fusion_limit, :type, :image_name)
        ON CONFLICT (mod_name)
        DO UPDATE SET (mod_description, base_drain, fusion_limit, type, image_name) = (:mod_description, :base_drain, :fusion_limit, :type, :image_name)
        WHERE mods.mod_name = :mod_name;
        `,
      {
        mod_name: mod.name,
        mod_description: mod.description,
        base_drain: mod.baseDrain,
        fusion_limit: mod.fusionLimit,
        type: mod.type,
        image_name: mod.imageName,
      },
    );
  }
});

Promise.all(modPromises).then(() => process.exit(0));
