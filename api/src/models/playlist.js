const knex = require('../../config/database');

module.exports.add_playlist = (playlist) => {
  return knex('playlist').insert(playlist);
}

module.exports.get_playlists = (id) => {
  return knex.select('*').from('user').join('playlist', 'playlist.userID', 'user.id').where('user.id', '=', id);
}