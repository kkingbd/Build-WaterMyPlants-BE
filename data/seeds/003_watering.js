exports.seed = async function(knex, Promise) {
      return knex('watering').insert([
        { plant_id: 1, watering_time: '2019-04-18 8:00' },
        { plant_id: 2, watering_time: '2019-04-19 14:00' },
        { plant_id: 3, watering_time: '2019-04-19 14:00' },
      ]);
    ;
};
