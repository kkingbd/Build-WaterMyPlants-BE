exports.seed = async function(knex, Promise) {
  return knex('plants')
    .then(function(){
      return knex('watering').insert([
        { plant_id:1 , watering_time: '2019-04-18 8:00' },
      ]);
    })
};
