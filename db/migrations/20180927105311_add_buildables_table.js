exports.up = function addBuildablesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('buildables')
    .then(exists => {
      if (!exists) {
        return knex.raw(
          `
            CREATE TABLE warframe_arsenal_public.buildables (
              buildable_id SERIAL PRIMARY KEY,
              buildable_type TEXT REFERENCES warframe_arsenal_public.buildable_types (buildable_type),
              UNIQUE (buildable_id, buildable_type)
            );
          `,
        );
      }
    });
};

exports.down = function addBuildablesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('buildables');
};
