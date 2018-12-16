exports.up = function addPolaritiesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('polarities')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('polarities', table => {
            table.string('polarity').primary();
          });
      }
    })
    .then(() =>
      knex.schema.raw(
        `
          GRANT SELECT ON TABLE warframe_arsenal_public.polarities TO guest, registered_user, admin;
          GRANT INSERT, UPDATE, DELETE ON TABLE warframe_arsenal_public.polarities TO admin;
        `,
      ),
    );
};

exports.down = function addPolaritiesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('polarities');
};
