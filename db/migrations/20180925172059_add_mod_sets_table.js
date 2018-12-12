exports.up = function addModSetsTableUp(knex) {
  return knex.schema.hasTable('mod_sets').then(exists => {
    if (!exists) {
      return knex.schema.createTable('mod_sets', table => {
        table.string('mod_set').primary();
        table.string('description').notNullable();
        table
          .jsonb('data')
          .defaultTo('[]')
          .notNullable();
      });
    }
  });
};

exports.down = function addModSetsTableDown(knex) {
  return knex.schema.dropTableIfExists('mod_sets');
};
