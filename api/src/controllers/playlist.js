const { add_playlist, get_playlists } = require('../models/playlist');
const axios = require('axios');
const { client_id, client_secret } = require('../helpers/auth/spotify');
const { get_access_token } = require('../controllers/auth');

module.exports.add_playlist = (req, res, next) => {
  const playlist = req.body;
  console.log(playlist);
  add_playlist(playlist).then(() => {
    res.status(200).send({ 'message': 'Added playlist' });
  }).catch((err) => {
    console.log(err);
    res.status(400).send({ 'message': 'Error adding playlist' })
  })
}

module.exports.get_user_playlists = (req, res, next) => {
  const { userID } = req.params;
  get_access_token(userID).then((access_token) => {
    get_playlists(userID).then((playlists) => {
      transformedPlaylists = playlists.map((playlist) => {
        return playlist.spotifyID;
      });

      fetchFns = transformedPlaylists.map((playlist) => {
        return axios.get(`https://api.spotify.com/v1/playlists/${playlist}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        });
      });

      Promise.all(fetchFns).then((playlists) => {
        return playlists.map(p => p.data);
      }).then((data) => {
        res.status(200).send(data);
      });
    });
  });
}