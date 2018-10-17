exports.up = function addWeaponsTableUp(knex) {
  return knex.schema.hasTable('weapons').then((exists) => {
    if (!exists) {
      return knex.schema.raw(`
        CREATE TABLE weapons (
          buildable_id INTEGER,
          buildable_type TEXT NOT NULL DEFAULT 'Weapon' CHECK (buildable_type='Weapon'),
          weapon TEXT,
          description TEXT,
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
          trigger TEXT REFERENCES trigger_types (trigger_type),
          accuracy DECIMAL,
          status_chance DECIMAL,
          charge_attack INTEGER,
          spin_attack INTEGER,
          leap_attack INTEGER,
          wall_attack INTEGER,
          slot INTEGER,
          noise TEXT REFERENCES noise_types (noise_type),
          sentinel BOOLEAN NOT NULL,
          archwing BOOLEAN NOT NULL,
          vaulted BOOLEAN NOT NULL,
          mastery_requirement INTEGER,
          riven_disposition INTEGER,
          type TEXT REFERENCES weapon_types (weapon_type),
          category TEXT REFERENCES weapon_categories (weapon_category),
          channeling DECIMAL,
          projectile TEXT REFERENCES projectile_types (projectile_type),
          secondary JSONB,
          wikia_thumbnail TEXT,
          wikia_url TEXT,
          FOREIGN KEY (buildable_id, buildable_type) REFERENCES buildables (buildable_id, buildable_type) 
        );
      `);
    }
  });
};

exports.down = function addWeaponsTableDown(knex) {
  return knex.schema.dropTableIfExists('weapons');
};
