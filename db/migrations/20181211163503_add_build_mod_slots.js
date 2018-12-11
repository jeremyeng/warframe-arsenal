
exports.up = function addBuildModSlotsTableUp(knex) {
  return knex.schema.hasTable('build_mod_slots').then((exists) => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE build_mod_slots (
          build_mod_slot_id SERIAL PRIMARY KEY,
          build_id INTEGER NOT NULL REFERENCES builds (build_id),
          slot_polarity TEXT NOT NULL REFERENCES polarities (polarity) ON UPDATE CASCADE,
          mod_id INTEGER NOT NULL REFERENCES mods (mod_id),
          buildable_id INTEGER NOT NULL,
          buildable_type TEXT NOT NULL,
          FOREIGN KEY (buildable_id, buildable_type, mod_id) REFERENCES valid_buildable_mods ON DELETE CASCADE
        );
      `);
    }
  });
};

exports.down = function addBuildModSlotsTableDown(knex) {
  return knex.schema.dropTableIfExists('build_mod_slots');
};
