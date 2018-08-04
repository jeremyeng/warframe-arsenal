exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mod')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('mod').insert([
        {
          name: 'Vitality',
          description: 'Increases the maximum health of a warframe',
          polarity: 'vazarin',
          rank: {
            0: '+40%',
            1: '+80%',
            2: '+120%',
            3: '+160%',
            4: '+200%',
            5: '+240%',
            6: '+280%',
            7: '+320%',
            8: '+360%',
            9: '+400%',
            10: '+440%'
          }
        }
      ]);
    });
};
