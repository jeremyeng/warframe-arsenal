exports.up = function(knex) {
  return knex.schema.raw(
    `
      ALTER TABLE warframe_arsenal_public.builds ADD COLUMN
        user_id INTEGER NOT NULL REFERENCES warframe_arsenal_public.users(user_id);
    `,
  );
};

exports.down = function(knex) {
  return knex.schema.raw(
    `
      ALTER TABLE warframe_arsenal_public.builds DROP COLUMN user_id;
    `,
  );
};
