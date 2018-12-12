exports.up = function addSentinelsTableUp(knex) {
  return knex.schema.hasTable('sentinels').then(exists => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE sentinels (
          buildable_id INTEGER,
          buildable_type TEXT NOT NULL DEFAULT 'Sentinel' CHECK (buildable_type = 'Sentinel'),
          sentinel TEXT NOT NULL,
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

exports.down = function addSentinelsTableDown(knex) {
  return knex.schema.dropTableIfExists('sentinels');
};
