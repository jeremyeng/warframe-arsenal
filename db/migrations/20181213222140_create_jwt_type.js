exports.up = function(knex) {
  return knex.schema.raw(
    `
    CREATE TYPE warframe_arsenal_public.jwt AS (
        ROLE text,
        user_id integer
    );
    `,
  );
};

exports.down = function(knex) {
  return knex.schema.raw(`DROP TYPE IF EXISTS warframe_arsenal_public.jwt`);
};
