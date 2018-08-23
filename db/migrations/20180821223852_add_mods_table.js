exports.up = function(knex, Promise) {
  return knex.schema.hasTable('mods').then(function(exists) {
    if (!exists) {
      return knex.schema
        .createTable('mods', function(t) {
          t.increments('mod_id').primary();
          t.string('mod_name').notNullable();
          t.text('mod_description').notNullable();
          t.integer('base_drain').notNullable();
          t.integer('fusion_limit').notNullable();
          t.jsonb('effect');
          t.string('type');
          t.string('image_name');
        })
        .alterTable('mods', function(t) {
          t.unique('mod_name');
        });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('mods');
};
