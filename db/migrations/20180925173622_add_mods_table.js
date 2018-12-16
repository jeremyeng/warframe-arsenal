exports.up = function addModsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('mods')
    .then(exists => {
      if (!exists) {
        return knex.schema.raw(
          `
            CREATE TABLE warframe_arsenal_public.mods (
              mod_id SERIAL PRIMARY KEY,
              mod TEXT NOT NULL UNIQUE,
              mod_type TEXT NOT NULL REFERENCES warframe_arsenal_public.mod_types(mod_type) ON UPDATE CASCADE,
              polarity TEXT NOT NULL REFERENCES warframe_arsenal_public.polarities(polarity) ON UPDATE CASCADE,
              description TEXT,
              base_drain INTEGER NOT NULL,
              fusion_limit INTEGER NOT NULL,
              data JSONB,
              image_name TEXT
            );
          `,
        );
      }
    })
    .then(() =>
      knex.schema.raw(
        `
          GRANT SELECT ON TABLE warframe_arsenal_public.mods TO guest, registered_user, admin;
          GRANT INSERT, UPDATE, DELETE ON TABLE warframe_arsenal_public.mods TO admin;
          GRANT USAGE ON SEQUENCE warframe_arsenal_public.mods_mod_id_seq TO admin;
        `,
      ),
    );
};

exports.down = function addModsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('mods');
};
