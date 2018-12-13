exports.up = function addModsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('mods')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('mods', table => {
            table.increments('mod_id').primary();
            table
              .string('mod')
              .notNullable()
              .unique();
            table.text('description');
            table.integer('base_drain').notNullable();
            table.integer('fusion_limit').notNullable();
            table.jsonb('data');
            table
              .string('mod_type')
              .notNullable()
              .references('mod_type')
              .inTable('mod_types')
              .onUpdate('CASCADE');
            table.string('image_name');
            table
              .string('polarity')
              .notNullable()
              .references('polarity')
              .inTable('polarities')
              .onUpdate('CASCADE');
          });
      }
    });
};

exports.down = function addModsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('mods');
};
