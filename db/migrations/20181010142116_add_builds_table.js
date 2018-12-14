exports.up = function addBuildsTableUp(knex) {
  return knex.schema.hasTable('builds').then(exists => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE builds (
          build_id SERIAL PRIMARY KEY,
          buildable_id INTEGER NOT NULL REFERENCES buildables (buildable_id),
          creation_date TIMESTAMP NOT NULL
        );
      `);
    }
  });
};

exports.down = function addBuildsTableDown(knex) {
  return knex.schema.dropTableIfExists('builds');
};
