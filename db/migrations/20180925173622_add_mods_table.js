exports.up = function addModsTableUp(knex) {
  return knex.schema.hasTable('mods').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('mods', (t) => {
        t.increments('mod_id').primary();
        t.string('mod')
          .notNullable()
          .unique();
        t.text('description');
        t.integer('base_drain').notNullable();
        t.integer('fusion_limit').notNullable();
        t.jsonb('data');
        t.string('type')
          .notNullable()
          .references('mod_type')
          .inTable('mod_types')
          .onUpdate('CASCADE');
        t.string('image_name');
        t.string('polarity')
          .notNullable()
          .references('polarity')
          .inTable('polarities')
          .onUpdate('CASCADE');
      });
    }
  });
};

exports.down = function addModsTableDown(knex) {
  return knex.schema.dropTableIfExists('mods');
};
