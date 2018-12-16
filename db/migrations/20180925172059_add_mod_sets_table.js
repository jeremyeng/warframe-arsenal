exports.up = function addModSetsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('mod_sets')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('mod_sets', table => {
            table.string('mod_set').primary();
            table.string('description').notNullable();
            table
              .jsonb('data')
              .defaultTo('[]')
              .notNullable();
          });
      }
    })
    .then(() =>
      knex.schema.raw(
        `
          GRANT SELECT ON TABLE warframe_arsenal_public.mod_sets TO guest, registered_user, admin;
          GRANT INSERT, UPDATE, DELETE ON TABLE warframe_arsenal_public.mod_sets TO admin;
        `,
      ),
    );
};

exports.down = function addModSetsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('mod_sets');
};
