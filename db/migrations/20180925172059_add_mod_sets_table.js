exports.up = function addModSetsTableUp(knex) {
  return knex.schema.hasTable('mod_sets').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('mod_sets', (t) => {
        t.increments('mod_set_id').primary();
        t.string('mod_set')
          .notNullable()
          .unique();
        t.string('description').notNullable();
        t.jsonb('data').defaultTo('[]').notNullable();
      });
    }
  });
};

exports.down = function addModSetsTableDown(knex) {
  return knex.schema.dropTableIfExists('mod_sets');
};
