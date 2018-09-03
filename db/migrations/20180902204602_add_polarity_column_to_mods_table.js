
exports.up = function addPolarityColumnUp(knex) {
  return knex.schema.table('mods', (t) => {
    t.string('polarity').references('name').inTable('polarities');
  });
};

exports.down = function addPolarityColumnDown(knex) {
  return knex.schema.table('mods', (t) => {
    t.dropForeign('polarity');
  });
};
