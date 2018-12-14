exports.up = function addValidBuildableModsTableUp(knex) {
  return knex.schema.hasTable('valid_buildable_mods').then(exists => {
    if (!exists) {
      return knex.schema.raw(`
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
  return knex.schema.dropTableIfExists('valid_buildable_mods');
};
