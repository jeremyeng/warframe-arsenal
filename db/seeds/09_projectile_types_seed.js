const projectileTypes = require('./seed_data/ProjectileTypes.json');

exports.seed = function seedProjectileTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(
    knex.ref('projectile_types').withSchema('warframe_arsenal_public'),
  )
    .del()
    .then(() =>
      Promise.all(
        projectileTypes.map(noiseType =>
          knex(
            knex.ref('projectile_types').withSchema('warframe_arsenal_public'),
          ).insert({
            projectile_type: noiseType,
          }),
        ),
      ),
    );
};
