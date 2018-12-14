const projectileTypes = require('./seed_data/ProjectileTypes.json');

exports.seed = function seedProjectileTypesDev(knex, Promise) {
  // Deletes ALL existing entries
  return knex(knex.ref('projectile_types'))
    .del()
    .then(() =>
      Promise.all(
        projectileTypes.map(noiseType =>
          knex(knex.ref('projectile_types')).insert({
            projectile_type: noiseType,
          }),
        ),
      ),
    );
};
