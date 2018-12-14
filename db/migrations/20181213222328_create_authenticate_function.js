exports.up = function(knex) {
  return knex.schema
    .raw(
      `
      CREATE FUNCTION warframe_arsenal_public.authenticate (email text, password text)
          RETURNS warframe_arsenal_public.jwt
      AS $$
      DECLARE
          account warframe_arsenal_private.user_accounts;
      BEGIN
          SELECT
              a.* INTO account
          FROM
              warframe_arsenal_private.user_accounts AS a
          WHERE
              a.email = $1;
              
          IF account.password_hash = crypt(password, account.password_hash) THEN
              RETURN ('warframe_arsenal_user',account.user_id)::forum_example.jwt_token;
          ELSE
              RETURN NULL;
          END IF;
      END;
      $$
      LANGUAGE plpgsql STRICT
      SECURITY DEFINER;
      `,
    )
    .then(() =>
      knex.schema.raw(
        `
        DO $$
        BEGIN
            IF EXISTS (SELECT 1 FROM  pg_proc WHERE proname = 'warframe_arsenal_public.authenticate') THEN
                COMMENT ON FUNCTION warframe_arsenal_public.register_user (text, text, text, text)
                IS 'Creates a JWT token that will securely identify a person and give them certain permissions.';
            END IF;
        END;
        $$;
        `,
      ),
    );
};

exports.down = function(knex) {
  return knex.schema.raw(
    `DROP FUNCTION IF EXISTS warframe_arsenal_public.authenticate`,
  );
};
