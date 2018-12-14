exports.up = function addWarframesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('warframes')
    .then(exists => {
      if (!exists) {
        return knex.schema.raw(`
        CREATE TABLE warframe_arsenal_public.warframes (
          buildable_id INTEGER PRIMARY KEY,
          buildable_type TEXT NOT NULL DEFAULT 'Warframe' CHECK (buildable_type = 'Warframe'),
          warframe TEXT NOT NULL,
          description TEXT,
          health INTEGER NOT NULL,
          shield INTEGER NOT NULL,
          armor INTEGER NOT NULL,
          energy INTEGER NOT NULL,
          sprint_speed DECIMAL NOT NULL,
          mastery_requirement INTEGER NOT NULL,
          aura_polarity TEXT REFERENCES warframe_arsenal_public.polarities (polarity) ON UPDATE CASCADE,
          wikia_url TEXT,
          image_name TEXT,
          FOREIGN KEY (buildable_id, buildable_type) REFERENCES warframe_arsenal_public.buildables (buildable_id, buildable_type) 
        );
      `);
      }
    });
};

exports.down = function addWarframesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('warframes');
};
