const bcrypt = require('bcryptjs');
const pw = bcrypt.hashSync('pass');
const seeds = [
  {
    username: 'mdmd',
    email: 'kki@gmail',
    password: pw,
    phone: '347412334'
  },
];
exports.seed = function(knex, Promise) {
      return knex('users').insert([...seeds]);
};
