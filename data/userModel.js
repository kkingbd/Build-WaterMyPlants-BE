const db = require('./dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateUser, 
  deleteUser,
};
function deleteUser(id) {
  return db('users')
    .where({ id })
    .delete();
}

function find() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user)
  .returning("id");
  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function updateUser(id, changes){
  db('users')
  .where({id})
  .update(changes)
}
