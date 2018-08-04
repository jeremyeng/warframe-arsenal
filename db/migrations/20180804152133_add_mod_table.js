exports.up = function(knex, Promise) {
  return knex.schema.hasTable('mod').then(function(exists) {
    if (!exists) {
      return knex.schema
        .raw("CREATE TYPE polarity AS ENUM('madurai', 'vazarin', 'naramon', 'zenurik', 'unairu', 'penjaga', 'umbra')")
        .createTable('mod', function(table) {
          table.increments('id');
          table.string('name').notNullable();
          table.string('description').notNullable();
          table.specificType('polarity', 'polarity').notNullable();
          table.jsonb('rank');
        });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists('mod')
  .raw('DROP TYPE IF EXISTS polarity');
};
