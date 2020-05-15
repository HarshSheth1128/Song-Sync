const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { foo: 'bar' },
  'shhhhh',
  {
    header: {
      alg: 'ES256',
      kid: '98DJM582U6',
    }
  }
);

export createJWT() {

}