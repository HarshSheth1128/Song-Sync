const router = require('express').Router()

const {
    get_dev_token
} = require('../controllers/auth');

router.route('/dev').get(get_dev_token);

module.exports = router;