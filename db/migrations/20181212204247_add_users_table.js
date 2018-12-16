exports.up = function(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .createTable('users', function(table) {
      table.increments('user_id').primary();
      table.string('username').notNullable();
    })
    .then(() =>
      knex.schema.raw(
        `
          GRANT SELECT ON TABLE warframe_arsenal_public.users TO guest, registered_user, admin;
        `,
      ),
    );
};

exports.down = function(knex) {
  return knex.schema.withSchema('warframe_arsenal_public').dropTable('users');
};
