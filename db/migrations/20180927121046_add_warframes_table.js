exports.up = function addWarframesTableUp(knex) {
  return knex.schema.hasTable('warframes').then((exists) => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE warframes (
          buildable_id INTEGER PRIMARY KEY,
          buildable_type_id INTEGER NOT NULL DEFAULT 1 CHECK (buildable_type_id = 1),
          name TEXT NOT NULL,
          description TEXT,
          health INTEGER NOT NULL,
          shield INTEGER NOT NULL,
          armor INTEGER NOT NULL,
          energy INTEGER NOT NULL,
          sprint_speed DECIMAL NOT NULL,
          mastery_requirement INTEGER NOT NULL,
          aura_polarity TEXT REFERENCES polarities (polarity),
          wikia_url TEXT,
          image_name TEXT,
          FOREIGN KEY (buildable_id, buildable_type_id) REFERENCES buildables (buildable_id, buildable_type_id) 
        );
      `);
    }
  });
};

exports.down = function addWarframesTableDown(knex) {
  return knex.schema.dropTableIfExists('warframes');
};