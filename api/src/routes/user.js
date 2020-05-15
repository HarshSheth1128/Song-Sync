const router = require('express').Router()

const {
  register_user,
  authenticate_user
} = require('../controllers/user');

router.route('/register').post(register_user);

router.route('/authenticate').post(authenticate_user);

module.exports = router;