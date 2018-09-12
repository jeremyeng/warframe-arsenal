export default {
  Query: {
    mod: (parent, { id }, { knex }) => knex
      .select()
      .from('mods')
      .where('mod_id', id)
      .then((results) => {
        const mod = results[0];
        return mod
          ? {
            id: mod.mod_id,
            name: mod.name,
            description: mod.description,
            baseDrain: mod.base_drain,
            fusionLimit: mod.fusion_limit,
            type: mod.type,
            polarity: mod.polarity,
            data: mod.data,
          }
          : null;
      }),
    mods: (parent, args, { knex }) => knex
      .select()
      .from('mods')
      .then(results => results.map(mod => ({
        id: mod.mod_id,
        name: mod.name,
        description: mod.description,
        baseDrain: mod.base_drain,
        fusionLimit: mod.fusion_limit,
        type: mod.type,
        polarity: mod.polarity,
        data: mod.data,
      }))),
  },
};
