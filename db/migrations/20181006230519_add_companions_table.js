exports.up = function addCompanionsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('companions')
    .then(exists => {
      if (!exists) {
        return knex.schema.raw(`
        CREATE TABLE warframe_arsenal_public.companions (
          buildable_id INTEGER PRIMARY KEY,
          buildable_type TEXT NOT NULL DEFAULT 'Companion' CHECK (buildable_type = 'Companion'),
          companion_type TEXT NOT NULL REFERENCES warframe_arsenal_public.companion_types (companion_type),
          companion TEXT NOT NULL,
          description TEXT,
          health INTEGER NOT NULL,
          shield INTEGER NOT NULL,
          armor INTEGER NOT NULL,
          energy INTEGER NOT NULL,
          wikia_url TEXT,
          image_name TEXT,
          FOREIGN KEY (buildable_id, buildable_type) REFERENCES warframe_arsenal_public.buildables (buildable_id, buildable_type) 
        );
      `);
      }
    })
    .then(() =>
      knex.schema.raw(
        `
          GRANT SELECT ON TABLE warframe_arsenal_public.companions TO guest, registered_user, admin;
          GRANT INSERT, UPDATE, DELETE ON TABLE warframe_arsenal_public.companions TO admin;
        `,
      ),
    );
};

exports.down = function addCompanionsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('companions');
};
