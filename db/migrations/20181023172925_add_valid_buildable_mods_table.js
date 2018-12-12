exports.up = function addValidBuildableModsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('valid_buildable_mods')
    .then(exists => {
      if (!exists) {
        return knex.schema.withSchema('warframe_arsenal_public').raw(`
        CREATE TABLE valid_buildable_mods (
          buildable_id INTEGER NOT NULL REFERENCES buildables (buildable_id),
          mod_id INTEGER NOT NULL REFERENCES mods (mod_id),
          PRIMARY KEY (buildable_id, mod_id)
        );
      `);
      }
    });
};

exports.down = function addValidBuildableModsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('valid_buildable_mods');
};
