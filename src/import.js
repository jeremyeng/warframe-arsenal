import knex from '../db/knex';
import mods from '../lib/warframe-items/data/json/Mods.json';

const modPromises = mods.map((mod) => {
  if (mod.name && mod.description && mod.baseDrain && mod.fusionLimit && mod.stats) {
    return knex.raw(
      `
        INSERT INTO mods (name, description, base_drain, fusion_limit, data, type, image_name)
        VALUES (:name, :description, :base_drain, :fusion_limit, :data, :type, :image_name)
        ON CONFLICT (name)
        DO UPDATE SET (description, base_drain, fusion_limit, data, type, image_name) = (:description, :base_drain, :fusion_limit, :data, :type, :image_name)
        WHERE mods.name = :name;
        `,
      {
        name: mod.name,
        description: mod.description,
        base_drain: mod.baseDrain,
        fusion_limit: mod.fusionLimit,
        data: mod.stats,
        type: mod.type,
        image_name: mod.imageName,
      },
    );
  }
});

Promise.all(modPromises).then(() => {
  process.exit(0);
}).catch((error) => {
  console.log(error);
  process.exit(1);
});
