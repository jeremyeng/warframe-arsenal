exports.up = function addModSetsTableUp(knex) {
  return knex.schema.hasTable('mod_sets').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('mod_sets', (table) => {
        table.increments('mod_set_id').primary();
        table.string('mod_set')
          .notNullable()
          .unique();
        table.string('description').notNullable();
        table.jsonb('data').defaultTo('[]').notNullable();
      });
    }
  });
};

exports.down = function addModSetsTableDown(knex) {
  return knex.schema.dropTableIfExists('mod_sets');
};
