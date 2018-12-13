exports.up = function(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .createTable('users', function(table) {
      table.increments('user_id').primary();
      table.string('username').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.withSchema('warframe_arsenal_public').dropTable('users');
};
