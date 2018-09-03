import knex from '../db/knex';
import mods from '../lib/warframe-items/data/json/Mods.json';

const modPromises = mods.map(mod => knex.raw(
  `
        INSERT INTO mods (name, description, base_drain, fusion_limit, data, type, image_name, polarity)
        VALUES (:name, :description, :base_drain, :fusion_limit, :data, :type, :image_name, :polarity)
        ON CONFLICT (name)
        DO UPDATE SET (description, base_drain, fusion_limit, data, type, image_name, polarity) = (:description, :base_drain, :fusion_limit, :data, :type, :image_name, :polarity)
        WHERE mods.name = :name;
        `,
  {
    name: mod.name,
    description: mod.description || '',
    base_drain: mod.baseDrain,
    fusion_limit: mod.fusionLimit,
    data: mod.stats || {},
    type: mod.type,
    image_name: mod.imageName,
    polarity: mod.polarity.toLowerCase(),
  },
));

Promise.all(modPromises)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
