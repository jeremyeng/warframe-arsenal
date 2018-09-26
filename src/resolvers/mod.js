export default {
  Query: {
    mod: (parent, { id }, { loaders }) => loaders.modById.load(id),
    mods: (parent, args, { knex }) => knex('mods'),
  },
  Mod: {
    id: parent => parent.mod_id,
    name: parent => parent.mod,
    baseDrain: parent => parent.base_drain,
    fusionLimit: parent => parent.fusion_limit,
  },
};
