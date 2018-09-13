import 'app-module-path/cwd';
import knex from 'db/knex';
import mods from 'lib/warframe-items/data/json/Mods.json';
import warframes from 'lib/warframe-items/data/json/Warframes.json';

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

const warframePromises = warframes.map(warframe => knex.raw(
  `
        INSERT INTO warframes (name, description, health, shield, armor, energy, sprint_speed, mastery_requirement, aura_polarity, wikia_url, image_name)
        VALUES (:name, :description, :health, :shield, :armor, :energy, :sprint_speed, :mastery_requirement, :aura_polarity, :wikia_url, :image_name)
        ON CONFLICT (name)
        DO UPDATE SET (description, health, shield, armor, energy, sprint_speed, mastery_requirement, aura_polarity, wikia_url, image_name) 
        = (:description, :health, :shield, :armor, :energy, :sprint_speed, :mastery_requirement, :aura_polarity, :wikia_url, :image_name)
        WHERE warframes.name = :name;
        `,
  {
    name: warframe.name,
    description: warframe.description || '',
    health: warframe.health,
    shield: warframe.shield,
    armor: warframe.armor,
    energy: warframe.power,
    sprint_speed: warframe.sprint,
    mastery_requirement: warframe.masteryReq,
    aura_polarity: warframe.aura === undefined ? null : warframe.aura,
    wikia_url: warframe.wikiaUrl,
    image_name: warframe.imageName,
  },
));

Promise.all(modPromises.concat(warframePromises))
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
