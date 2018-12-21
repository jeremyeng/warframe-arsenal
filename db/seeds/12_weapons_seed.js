const primaries = require('./seed_data/Primary.json');
const secondaries = require('./seed_data/Secondary.json');
const melees = require('./seed_data/Melee.json');
const archwingPrimaries = require('./seed_data/Archwing Primary.json');
const archwingMelees = require('./seed_data/Archwing Melee.json');
const sentinelPrimaries = require('./seed_data/Sentinel Primary.json');

const weapons = primaries
  .concat(secondaries)
  .concat(melees)
  .concat(archwingPrimaries)
  .concat(archwingMelees)
  .concat(sentinelPrimaries);

exports.seed = function seedWeaponsDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex.transaction(trx =>
    trx(trx.ref('weapons').withSchema('warframe_arsenal_public'))
      .del()
      .then(() =>
        Promise.all(
          weapons.map(weapon =>
            trx(trx.ref('buildables').withSchema('warframe_arsenal_public'))
              .insert({ buildable_type: 'Weapon' })
              .returning('buildable_id')
              .then(([buildableId]) =>
                trx(
                  trx.ref('weapons').withSchema('warframe_arsenal_public'),
                ).insert({
                  buildable_id: buildableId,
                  weapon: weapon.name,
                  description: weapon.description,
                  seconds_per_shot: weapon.secondsPerShot,
                  magazine_size: weapon.magazineSize,
                  ammo: weapon.ammo,
                  reload_time: weapon.reloadTime,
                  total_damage: weapon.totalDamage,
                  damage_per_second: weapon.damagePerSecond,
                  impact_damage: weapon.damageTypes.impact,
                  slash_damage: weapon.damageTypes.slash,
                  puncture_damage: weapon.damageTypes.puncture,
                  toxin_damage: weapon.damageTypes.toxin,
                  heat_damage: weapon.damageTypes.heat,
                  electricity_damage: weapon.damageTypes.electricity,
                  cold_damage: weapon.damageTypes.cold,
                  blast_damage: weapon.damageTypes.blast,
                  corrosive_damage: weapon.damageTypes.corrosive,
                  gas_damage: weapon.damageTypes.gas,
                  magnetic_damage: weapon.damageTypes.magnetic,
                  radiation_damage: weapon.damageTypes.radiation,
                  viral_damage: weapon.damageTypes.viral,
                  fire_rate: weapon.fireRate,
                  critical_chance: weapon.criticalChance,
                  critical_multiplier: weapon.criticalMultiplier,
                  trigger_type: weapon.trigger,
                  accuracy: weapon.accuracy,
                  status_chance: weapon.procChance,
                  charge_attack: weapon.chargeAttack,
                  spin_attack: weapon.spinAttack,
                  leap_attack: weapon.leapAttack,
                  wall_attack: weapon.wallAttack,
                  slot: weapon.slot,
                  noise_type: weapon.noise,
                  sentinel: weapon.sentinel,
                  archwing: weapon.archwing,
                  mastery_requirement: weapon.masteryReq,
                  riven_disposition: weapon.disposition,
                  weapon_type: weapon.type,
                  weapon_category: weapon.category,
                  channeling: weapon.channeling,
                  projectile_type: weapon.projectile,
                  vaulted: weapon.vaulted,
                  secondary: weapon.secondary || weapon.secondaryArea,
                  wikia_thumbnail: weapon.wikiaThumbnail,
                  wikia_url: weapon.wikiaUrl,
                }),
              ),
          ),
        ),
      ),
  );
};
