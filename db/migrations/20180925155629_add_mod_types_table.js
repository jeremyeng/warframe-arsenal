exports.up = function addModTypesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('mod_types')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('mod_types', table => {
            table
              .string('mod_type')
              .notNullable()
              .primary();
          });
      }
    });
};

exports.down = function addModTypesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('mod_types');
};
