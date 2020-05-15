const {
  add_user,
  get_user
} = require('../models/user');
const {
  update_user,
  create_access_token
} = require('../controllers/auth');

module.exports.register_user = (req, res, next) => {
  const user = req.body;
  get_user(user).then((users) => {
    if (users.length !== 0) {
      res.status(400).send({ message: 'User already exists' });
    } else {
      return add_user(user);
    }
  }).then(() => {
    res.status(200).send({ message: 'User added' });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports.authenticate_user = (req, res, next) => {
  const user = req.body;
  get_user(user).then((users) => {
    if (users.length === 0) {
      res.status(400).send({ message: 'User does not exist' });
    }
    const actualUser = users[0];
    if (actualUser.password != user.password) {
      res.status(400).send({ message: 'Invalid credentials' });
    } else {
      create_access_token().then((token) => {
        update_user(actualUser.id, { spotify_access_token: token }).then(() => {
          res.status(200).send({
            message: 'Authenticated',
            data: {
              id: actualUser.id,
            }
          });
        })
      });
    }
  }).catch((err) => {
    console.log(err);
  });
};