exports.up = function addWarframesTableUp(knex) {
  return knex.schema.hasTable('warframes').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('warframes', (t) => {
          t.increments('warframe_id').primary();
          t.string('name').notNullable().unique();
          t.text('description').notNullable();
          t.integer('health').notNullable();
          t.integer('shield').notNullable();
          t.integer('armor').notNullable();
          t.integer('energy').notNullable();
          t.decimal('sprint_speed').notNullable();
          t.integer('mastery_requirement').notNullable();
          t.string('aura_polarity').references('name').inTable('polarities');
          t.string('wikia_url');
          t.string('image_name');
        });
    }
  });
};

exports.down = function addWarframesTableDown(knex) {
  return knex.schema.dropTableIfExists('warframes');
};
