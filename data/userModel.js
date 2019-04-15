const db = require('./dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const success = id ;
  const [id] = await db('users').insert(user)
  .returning(success);
  return findById(id);
}


function findById(id) {
  return db('users')
    .where({ id })
    .first();
}