exports.up = function(knex) {
  return knex.schema.raw(
    `
    CREATE TYPE warframe_arsenal_public.jwt AS (
        ROLE TEXT,
        user_id INTEGER,
        is_admin BOOLEAN,
        confirmed BOOLEAN,
        exp INTEGER
    );
    `,
  );
};

exports.down = function(knex) {
  return knex.schema.raw(`DROP TYPE IF EXISTS warframe_arsenal_public.jwt`);
};
