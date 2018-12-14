exports.up = function addBuildModSlotsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('build_mod_slots')
    .then(exists => {
      if (!exists) {
        return knex.schema.raw(`
        CREATE TABLE warframe_arsenal_public.build_mod_slots (
          build_mod_slot_id SERIAL PRIMARY KEY,
          mod_id INTEGER NOT NULL REFERENCES warframe_arsenal_public.mods (mod_id),
          build_id INTEGER NOT NULL REFERENCES warframe_arsenal_public.builds (build_id),
          buildable_id INTEGER NOT NULL REFERENCES warframe_arsenal_public.buildables (buildable_id),
          slot_polarity TEXT NOT NULL REFERENCES warframe_arsenal_public.polarities (polarity) ON UPDATE CASCADE,
          FOREIGN KEY (buildable_id, mod_id) REFERENCES warframe_arsenal_public.valid_buildable_mods ON DELETE CASCADE
        );
      `);
      }
    });
};

exports.down = function addBuildModSlotsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('build_mod_slots');
};
