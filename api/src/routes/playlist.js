const router = require('express').Router()

const {
  get_user_playlists,
  add_playlist
} = require('../controllers/playlist');

router.route('/playlists/:userID').get(get_user_playlists);

router.route('/playlists/:userID').post(add_playlist);

module.exports = router;