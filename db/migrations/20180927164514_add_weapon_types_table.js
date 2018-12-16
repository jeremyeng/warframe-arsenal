exports.up = function addWeaponTypesTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('weapon_types')
    .then(exists => {
      if (!exists) {
        return knex.schema
          .withSchema('warframe_arsenal_public')
          .createTable('weapon_types', table => {
            table.string('weapon_type').primary();
          });
      }
    })
    .then(() =>
      knex.schema.raw(
        `
          GRANT SELECT ON TABLE warframe_arsenal_public.weapon_types TO guest, registered_user, admin;
          GRANT INSERT, UPDATE, DELETE ON TABLE warframe_arsenal_public.weapon_types TO admin;
        `,
      ),
    );
};

exports.down = function addWeaponTypesTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('weapon_types');
};
