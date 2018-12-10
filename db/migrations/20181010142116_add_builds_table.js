
exports.up = function addBuildsTableUp(knex) {
  return knex.schema.hasTable('builds').then((exists) => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE builds (
          build_id SERIAL PRIMARY KEY,
          buildable_id INTEGER NOT NULL,
          buildable_type TEXT NOT NULL,
          creation_date TIMESTAMP NOT NULL,
          FOREIGN KEY (buildable_id, buildable_type) REFERENCES buildables (buildable_id, buildable_type) 
        );
      `);
    }
  });
};

exports.down = function addBuildsTableDown(knex) {
  return knex.schema.dropTableIfExists('builds');
};
