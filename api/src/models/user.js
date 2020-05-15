const knex = require('../../config/database');

module.exports.add_user = (user) => {
  return knex('user').insert(user);
}

module.exports.get_user = (user) => {
  const { email } = user;
  return knex('user').select('*').where({ email });
}

module.exports.get_user_by_id = (id) => {
  return knex('user').select('*').where({ id });
}

module.exports.update_user = (id, updates) => {
  return knex('user').update(updates).where({ id });
}