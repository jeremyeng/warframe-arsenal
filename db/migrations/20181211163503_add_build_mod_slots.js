exports.up = function addBuildModSlotsTableUp(knex) {
  return knex.schema.hasTable('build_mod_slots').then(exists => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE build_mod_slots (
          build_mod_slot_id SERIAL PRIMARY KEY,
          mod_id INTEGER NOT NULL REFERENCES mods (mod_id),
          build_id INTEGER NOT NULL REFERENCES builds (build_id),
          buildable_id INTEGER NOT NULL REFERENCES buildables (buildable_id),
          slot_polarity TEXT NOT NULL REFERENCES polarities (polarity) ON UPDATE CASCADE
        );
      `);
    }
  });
};

exports.down = function addBuildModSlotsTableDown(knex) {
  return knex.schema.dropTableIfExists('build_mod_slots');
};
