exports.up = function(knex) {
  return knex.schema.raw(
    `
      CREATE FUNCTION warframe_arsenal_public.current_user ()
          RETURNS warframe_arsenal_public.users
      AS $$
      SELECT
          *
      FROM
          warframe_arsenal_public.users
      WHERE
          user_id = nullif(current_setting('jwt.claims.user_id', TRUE), '')::integer
      $$
      LANGUAGE sql STABLE;
      `,
  );
};

exports.down = function(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .raw(`DROP FUNCTION IF EXISTS warframe_arsenal_public.current_user`);
};
