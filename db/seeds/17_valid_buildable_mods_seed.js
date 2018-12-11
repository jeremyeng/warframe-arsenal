exports.seed = (knex, Promise) => knex('mods')
  .where({ mod_type: 'Warframe' })
  .select('mod_id')
  .then(warframeModIds => knex('warframes')
    .select('buildable_id', 'buildable_type')
    .then(result => Promise.all(
      result.map(({ buildable_id, buildable_type }) => Promise.all(
        warframeModIds.map(({ mod_id }) => knex('valid_buildable_mods').insert({
          buildable_id,
          buildable_type,
          mod_id,
        })),
      )),
    )));
