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
    });
};

exports.down = function addBuildsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('builds');
};
