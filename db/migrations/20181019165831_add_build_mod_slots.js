
exports.up = function addBuildModSlotsTableUp(knex) {
  return knex.schema.hasTable('build_mod_slots').then((exists) => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE build_mod_slots (
          build_id INTEGER NOT NULL REFERENCES builds (build_id),
          mod_id INTEGER NOT NULL REFERENCES mods (mod_id),
          slot_polarity TEXT NOT NULL REFERENCES polarities (polarity) ON UPDATE CASCADE,
          PRIMARY KEY (build_id, mod_id)
        );
      `);
    }
  });
};

exports.down = function addBuildModSlotsTableDown(knex) {
  return knex.schema.dropTableIfExists('build_mod_slots');
};
