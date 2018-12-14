exports.up = function(knex) {
  return knex.schema
    .raw(
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
    )
    .then(() =>
      knex.schema.raw(
        `
        DO $$
        BEGIN
            IF EXISTS (SELECT 1 FROM  pg_proc WHERE proname = 'warframe_arsenal_public.authenticate') THEN
                COMMENT ON FUNCTION warframe_arsenal_public.register_user (text, text, text, text)
                IS 'Gets the user who was identified by our JWT.';
            END IF;
        END;
        $$;
        `,
      ),
    );
};

exports.down = function(knex) {
  return knex.schema.raw(
    `DROP FUNCTION IF EXISTS warframe_arsenal_public.current_user`,
  );
};
