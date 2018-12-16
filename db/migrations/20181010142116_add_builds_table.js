exports.up = function addBuildsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('builds')
    .then(exists => {
      if (!exists) {
        return knex.schema.raw(`
        CREATE TABLE warframe_arsenal_public.builds (
          build_id SERIAL PRIMARY KEY,
          buildable_id INTEGER NOT NULL REFERENCES warframe_arsenal_public.buildables (buildable_id),
          creation_date TIMESTAMP NOT NULL DEFAULT now()
        );
      `);
      }
    })
    .then(() =>
      knex.schema.raw(
        `
          GRANT SELECT ON TABLE warframe_arsenal_public.builds TO guest, registered_user, admin;
          GRANT INSERT, UPDATE, DELETE ON TABLE warframe_arsenal_public.builds TO admin;
          GRANT USAGE ON SEQUENCE warframe_arsenal_public.builds_build_id_seq TO admin;
        `,
      ),
    );
};

exports.down = function addBuildsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('builds');
};
