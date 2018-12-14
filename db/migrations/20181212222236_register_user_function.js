exports.up = function(knex) {
  return knex.schema
    .raw(
      `
        CREATE FUNCTION warframe_arsenal_public.register_user (username text, email text, password text)
            RETURNS warframe_arsenal_public.users
        AS $$
        DECLARE
            warframe_arsenal_user warframe_arsenal_public.users;
        BEGIN
            INSERT INTO warframe_arsenal_public.users (username)
            VALUES (username)
            RETURNING * INTO warframe_arsenal_user;
    
            INSERT INTO warframe_arsenal_private.user_accounts (user_id, email, password_hash)
            VALUES (warframe_arsenal_user.user_id, email, crypt(password, gen_salt('bf')));
            RETURN user;
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
            IF EXISTS (SELECT 1 FROM  pg_proc WHERE proname = 'warframe_arsenal_public.register_user') THEN
                COMMENT ON FUNCTION warframe_arsenal_public.register_user (text, text, text, text)
                IS 'Registers a single user and creates an account.';
            END IF;
        END;
        $$;
        `,
      ),
    );
};

exports.down = function(knex) {
  return knex.schema.raw(
    `DROP FUNCTION IF EXISTS warframe_arsenal_public.register_user`,
  );
};
