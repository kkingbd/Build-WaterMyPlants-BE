exports.seed = function(knex, Promise) {
      return knex('plants')
      .then(function(){
      return knex('plants').insert([...seeds]);
      })
};
const seeds = [{name: "Rose", user_id: 1} ];


