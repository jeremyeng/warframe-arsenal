/* eslint-disable no-useless-escape */
exports.up = function(knex) {
  return knex.schema.withSchema('warframe_arsenal_private').raw(`
    CREATE TABLE warframe_arsenal_private.user_accounts (
      user_id INTEGER PRIMARY KEY REFERENCES warframe_arsenal_public.users(user_id) ON DELETE CASCADE,
      email TEXT NOT NULL UNIQUE CHECK (email ~* '^.+@.+\..+$'),
      password_hash TEXT NOT NULL,
      confirmed BOOLEAN NOT NULL DEFAULT FALSE,
      is_admin BOOLEAN NOT NULL DEFAULT FALSE,
      registration_date TIMESTAMP NOT NULL DEFAULT now()
    );
    `);
};

exports.down = function(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_private')
    .dropTable('user_accounts');
};
