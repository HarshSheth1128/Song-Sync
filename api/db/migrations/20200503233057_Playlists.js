
exports.up = function (knex) {
  return knex.schema.createTable('playlist', function (table) {
    table.increments();
    table.string('spotifyID');
    table.integer('userID').unsigned();
    table.foreign('userID').references('user.id');
    table.string('targetName');
    table.boolean('includeExplicit');
    table.enu('syncRegularity', ['Daily', 'Weekly', 'Monthly', 'Yearly']);
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('playlist');
};
