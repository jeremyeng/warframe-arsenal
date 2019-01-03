exports.up = function addWeaponsTableUp(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .hasTable('weapons')
    .then(exists => {
      if (!exists) {
        return knex.schema.raw(`
        CREATE TABLE warframe_arsenal_public.weapons (
          buildable_id INTEGER PRIMARY KEY,
          buildable_type TEXT NOT NULL DEFAULT 'Weapon' CHECK (buildable_type='Weapon'),
          weapon TEXT,
          description TEXT,
          weapon_type TEXT REFERENCES warframe_arsenal_public.weapon_types (weapon_type),
          weapon_category TEXT REFERENCES warframe_arsenal_public.weapon_categories (weapon_category),
          projectile_type TEXT REFERENCES warframe_arsenal_public.projectile_types (projectile_type),
          trigger_type TEXT REFERENCES warframe_arsenal_public.trigger_types (trigger_type),
          noise_type TEXT REFERENCES warframe_arsenal_public.noise_types (noise_type),
          seconds_per_shot DECIMAL,
          magazine_size INTEGER,
          ammo INTEGER,
          reload_time DECIMAL,
          total_damage DECIMAL,
          damage_per_second DECIMAL,
          impact_damage DECIMAL,
          slash_damage DECIMAL,
          puncture_damage DECIMAL,
          toxin_damage DECIMAL,
          heat_damage DECIMAL,
          electricity_damage DECIMAL,
          cold_damage DECIMAL,
          blast_damage DECIMAL,
          corrosive_damage DECIMAL,
          gas_damage DECIMAL,
          magnetic_damage DECIMAL,
          radiation_damage DECIMAL,
          viral_damage DECIMAL,
          fire_rate DECIMAL,
          critical_chance DECIMAL,
          critical_multiplier DECIMAL,
          accuracy DECIMAL,
          status_chance DECIMAL,
          charge_attack INTEGER,
          spin_attack INTEGER,
          leap_attack INTEGER,
          wall_attack INTEGER,
          slot INTEGER,
          sentinel BOOLEAN NOT NULL,
          archwing BOOLEAN NOT NULL,
          vaulted BOOLEAN NOT NULL,
          mastery_requirement INTEGER,
          riven_disposition INTEGER,
          channeling DECIMAL,
          secondary JSONB,
          wikia_thumbnail TEXT,
          wikia_url TEXT,
          FOREIGN KEY (buildable_id, buildable_type) REFERENCES warframe_arsenal_public.buildables (buildable_id, buildable_type) 
        );
      `);
      }
    })
    .then(() =>
      knex.schema.raw(
        `
          GRANT SELECT ON TABLE warframe_arsenal_public.weapons TO guest, registered_user, admin;
          GRANT INSERT, UPDATE, DELETE ON TABLE warframe_arsenal_public.weapons TO admin;
        `,
      ),
    );
};

exports.down = function addWeaponsTableDown(knex) {
  return knex.schema
    .withSchema('warframe_arsenal_public')
    .dropTableIfExists('weapons');
};
