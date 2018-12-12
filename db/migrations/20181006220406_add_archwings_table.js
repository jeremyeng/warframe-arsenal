exports.up = function addArchwingsTableUp(knex) {
  return knex.schema.hasTable('archwings').then(exists => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE archwings (
          buildable_id INTEGER,
          buildable_type TEXT NOT NULL DEFAULT 'Archwing' CHECK (buildable_type = 'Archwing'),
          archwing TEXT NOT NULL,
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

exports.down = function addArchwingsTableDown(knex) {
  return knex.schema.dropTableIfExists('archwings');
};
