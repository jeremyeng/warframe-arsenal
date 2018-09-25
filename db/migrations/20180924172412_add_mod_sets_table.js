exports.up = function addModSetsTableUp(knex) {
  return knex.schema.hasTable('mod_sets').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('mod_sets', (t) => {
        t.increments('mod_set_id').primary();
        t.string('name')
          .notNullable()
          .unique();
        t.string('description').notNullable();
        t.specificType('data', "JSONB DEFAULT '[]'").notNullable();
      });
    }
  });
};

exports.down = function addModSetsTableDown(knex) {
  return knex.schema.dropTableIfExists('mod_sets');
};
