exports.up = function(knex) {
  return knex.schema.raw(
    `
      ALTER TABLE warframe_arsenal_public.builds ENABLE ROW LEVEL SECURITY;

      CREATE POLICY select_build ON warframe_arsenal_public.builds FOR SELECT 
        USING (TRUE);

      CREATE POLICY insert_build ON warframe_arsenal_public.builds FOR INSERT TO registered_user, admin 
        WITH CHECK (user_id = nullif(current_setting('jwt.claims.user_id', true), '')::integer);

      CREATE POLICY update_build ON warframe_arsenal_public.builds FOR UPDATE TO registered_user, admin 
        USING (user_id = nullif(current_setting('jwt.claims.user_id', true), '')::integer);
        
      CREATE POLICY delete_build ON warframe_arsenal_public.builds FOR DELETE TO registered_user, admin 
        USING (user_id = nullif(current_setting('jwt.claims.user_id', true), '')::integer);
    `,
  );
};

exports.down = function(knex) {
  return knex.schema.raw(
    `
      DROP POLICY select_build ON warframe_arsenal_public.builds;
      DROP POLICY insert_build ON warframe_arsenal_public.builds;
      DROP POLICY update_build ON warframe_arsenal_public.builds;
      DROP POLICY delete_build ON warframe_arsenal_public.builds;
      ALTER TABLE warframe_arsenal_public.builds DISABLE ROW LEVEL SECURITY;
    `,
  );
};
