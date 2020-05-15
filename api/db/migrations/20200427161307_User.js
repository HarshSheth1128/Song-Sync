
exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments();
    table.string('email');
    table.string('password');
    table.string('spotify_access_token');
    table.timestamps();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('user')
};
