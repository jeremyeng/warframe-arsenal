exports.up = function addCompanionsTableUp(knex) {
  return knex.schema.hasTable('companions').then((exists) => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE companions (
          buildable_id INTEGER PRIMARY KEY,
          buildable_type TEXT NOT NULL DEFAULT 'Companion' CHECK (buildable_type = 'Companion'),
          companion_type TEXT NOT NULL REFERENCES companion_types (companion_type),
          companion TEXT NOT NULL,
          description TEXT,
          health INTEGER NOT NULL,
          shield INTEGER NOT NULL,
          armor INTEGER NOT NULL,
          energy INTEGER NOT NULL,
          wikia_url TEXT,
          image_name TEXT,
          FOREIGN KEY (buildable_id, buildable_type) REFERENCES buildables (buildable_id, buildable_type) 
        );
      `);
    }
  });
};

exports.down = function addCompanionsTableDown(knex) {
  return knex.schema.dropTableIfExists('companions');
};
