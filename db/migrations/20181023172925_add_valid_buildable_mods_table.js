
exports.up = function addValidBuildableModsTableUp(knex) {
  return knex.schema.hasTable('valid_buildable_mods').then((exists) => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE valid_buildable_mods (
          buildable_id INTEGER NOT NULL,
          buildable_type TEXT NOT NULL,
          mod_id INTEGER NOT NULL REFERENCES mods (mod_id),
          FOREIGN KEY (buildable_id, buildable_type) REFERENCES buildables (buildable_id, buildable_type) 
        );
      `);
    }
  });
};

exports.down = function addValidBuildableModsTableDown(knex) {
  return knex.schema.dropTableIfExists('valid_buildable_mods');
};
