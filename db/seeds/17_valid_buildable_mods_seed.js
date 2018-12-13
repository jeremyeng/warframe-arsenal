function linkTableWithModTypes(tableName, modTypes, knex, Promise) {
  return knex('mods')
    .whereIn('mod_type', modTypes)
    .select('mod_id')
    .then(modIds =>
      knex(tableName)
        .select('buildable_id', 'buildable_type')
        .then(result =>
          Promise.all(
            result.map(({ buildable_id: buildableId }) =>
              Promise.all(
                modIds.map(({ mod_id: modId }) =>
                  knex('valid_buildable_mods').insert({
                    buildable_id: buildableId,
                    mod_id: modId,
                  }),
                ),
              ),
            ),
          ),
        ),
    );
}

function linkWeaponTypeWithModTypes(weaponType, modTypes, knex, Promise) {
  return knex('mods')
    .whereIn('mod_type', modTypes)
    .select('mod_id')
    .then(modIds =>
      knex('weapons')
        .where({ weapon_type: weaponType })
        .select('buildable_id', 'buildable_type')
        .then(result =>
          Promise.all(
            result.map(({ buildable_id: buildableId }) =>
              Promise.all(
                modIds.map(({ mod_id: modId }) =>
                  knex('valid_buildable_mods').insert({
                    buildable_id: buildableId,
                    mod_id: modId,
                  }),
                ),
              ),
            ),
          ),
        ),
    );
}

exports.seed = (knex, Promise) =>
  knex.transaction(trx =>
    Promise.all([
      linkTableWithModTypes('warframes', ['Warframe'], trx, Promise),
      linkTableWithModTypes('warframes', ['Aura'], trx, Promise),
      linkTableWithModTypes('sentinels', ['Sentinel'], trx, Promise),
      linkTableWithModTypes('companions', ['Companion'], trx, Promise),
      linkTableWithModTypes('archwings', ['Archwing'], trx, Promise),
      linkWeaponTypeWithModTypes('Rifle', ['Primary', 'Rifle'], trx, Promise),
      linkWeaponTypeWithModTypes(
        'Bow',
        ['Primary', 'Rifle', 'Bow'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes(
        'Crossbow',
        ['Primary', 'Rifle', 'Crossbow'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes(
        'Shotgun',
        ['Primary', 'Shotgun'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes(
        'Sniper Rifle',
        ['Primary', 'Rifle', 'Sniper Rifle'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes(
        'Spear Gun',
        ['Primary', 'Rifle', 'Spear Gun'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes(
        'Pistol',
        ['Secondary', 'Pistol'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes(
        'Dual Pistols',
        ['Secondary', 'Dual Pistols'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes(
        'Thrown',
        ['Secondary', 'Pistol', 'Thrown'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes(
        'Shotgun Sidearm',
        ['Secondary', 'Shotgun Sidearm'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes(
        'Blade and Whip',
        ['Melee', 'Blade and Whip'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes('Claws', ['Melee', 'Claws'], trx, Promise),
      linkWeaponTypeWithModTypes('Dagger', ['Melee', 'Dagger'], trx, Promise),
      linkWeaponTypeWithModTypes(
        'Dual Daggers',
        ['Melee', 'Dual Daggers'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes('Fist', ['Melee', 'Fist'], trx, Promise),
      linkWeaponTypeWithModTypes('Glaive', ['Melee', 'Glaive'], trx, Promise),
      linkWeaponTypeWithModTypes(
        'Gunblade',
        ['Melee', 'Gunblade'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes('Hammer', ['Melee', 'Hammer'], trx, Promise),
      linkWeaponTypeWithModTypes(
        'Heavy Blade',
        ['Melee', 'Heavy Blade'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes('Machete', ['Melee', 'Machete'], trx, Promise),
      linkWeaponTypeWithModTypes('Nikana', ['Melee', 'Nikana'], trx, Promise),
      linkWeaponTypeWithModTypes(
        'Nunchaku',
        ['Melee', 'Nunchaku'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes('Polearm', ['Melee', 'Polearm'], trx, Promise),
      linkWeaponTypeWithModTypes('Rapier', ['Melee', 'Rapier'], trx, Promise),
      linkWeaponTypeWithModTypes('Scythe', ['Melee', 'Scythe'], trx, Promise),
      linkWeaponTypeWithModTypes(
        'Sparring',
        ['Melee', 'Sparring'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes('Staff', ['Melee', 'Staff'], trx, Promise),
      linkWeaponTypeWithModTypes(
        'Sword and Shield',
        ['Melee', 'Sword and Shield'],
        trx,
        Promise,
      ),
      linkWeaponTypeWithModTypes('Sword', ['Melee', 'Sword'], trx, Promise),
      linkWeaponTypeWithModTypes('Tonfa', ['Melee', 'Tonfa'], trx, Promise),
      linkWeaponTypeWithModTypes('Warfan', ['Melee', 'Warfan'], trx, Promise),
      linkWeaponTypeWithModTypes('Whip', ['Melee', 'Whip'], trx, Promise),
      linkWeaponTypeWithModTypes('Arch-Gun', ['Arch-Gun'], trx, Promise),
      linkWeaponTypeWithModTypes('Arch-Melee', ['Arch-Melee'], trx, Promise),
    ]),
  );
