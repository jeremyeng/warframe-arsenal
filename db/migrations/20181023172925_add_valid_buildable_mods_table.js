exports.up = function addValidBuildableModsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('valid_buildable_mods')
    .then(exists => {
      if (!exists) {
        return knex.schema.raw(`
        CREATE TABLE warframe_arsenal_public.valid_buildable_mods (
          buildable_id INTEGER NOT NULL REFERENCES warframe_arsenal_public.buildables (buildable_id),
          mod_id INTEGER NOT NULL REFERENCES warframe_arsenal_public.mods (mod_id),
          PRIMARY KEY (buildable_id, mod_id)
        );
      `);
      }
    })
    .then(() =>
      knex.schema.raw(
        `
          GRANT SELECT ON TABLE warframe_arsenal_public.valid_buildable_mods TO guest, registered_user, admin;
          GRANT INSERT, UPDATE, DELETE ON TABLE warframe_arsenal_public.valid_buildable_mods TO admin;
        `,
      ),
    );
};

exports.down = function addValidBuildableModsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('valid_buildable_mods');
};
