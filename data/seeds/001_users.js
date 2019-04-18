const bcrypt = require('bcryptjs');
const pw = bcrypt.hashSync('pass');
const seeds = [
  { id: 200,
    username: 'md',
    email: 'kki@gmail',
    password: pw,
    phone: '347412334'
  },
];
exports.seed = function(knex, Promise) {
    return knex('plants')
    .then(function(){
      return knex('users').insert([...seeds]);
    })
};
