exports.up = function addModsTableUp(knex) {
  return knex.schema.hasTable('mods').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('mods', (t) => {
          t.increments('mod_id').primary();
          t.string('mod_name').notNullable();
          t.text('mod_description').notNullable();
          t.integer('base_drain').notNullable();
          t.integer('fusion_limit').notNullable();
          t.jsonb('mod_data');
          t.string('type');
          t.string('image_name');
        })
        .alterTable('mods', (t) => {
          t.unique('mod_name');
        });
    }
  });
};

exports.down = function addModsTableDown(knex) {
  return knex.schema.dropTableIfExists('mods');
};
