const express = require('express');
const router = express.Router();
const plantDb= require('../data/plantsModel.js');
const {authenticate, checkForPlantOwner, validPlantId} = require('../auth/auth.js');

//getting all the plant
router.get('/', authenticate, async (req, res)=>{
    try{
        await plantDb.find()
            .then(plant => {
                res.status(200).json(plant) })

    }catch (err){
         res.status(500).json({Error: 'An uexpected error happened', err});
    }
})
//get a plant by id
router.get('/:id', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try{
        const plant = await plantDb.findById(req.params.id);
        res.status(200).json(plant);
    }catch (err){
        res.status(500).json({ error: `there was an error: ${err}` });
    }
});
// Delete a plant by id
router.delete('/:id', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try{
        const plant = await plantDb.deletePlantById(req.params.id);
        res.status(200).json({message: `This ${plant} has deleted `} );
    }catch (err){
        res.status(500).json({ error: `there was an error: ${err}` });
    }
});

// update a plant by id
router.put('/:id', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try{
        const changes = req.body;
        if(changes){
            const update = await plantDb.updatePlant(req.params.id, changes);
            res.status(200).json({message:  'Plant updated'} );
        } else {
            res.status(400).json({ error: 'please provide something to update' });
        }
    }catch (err){
        res.status(500).json({ error: `there was an error: ${err}` });
    }
});

// add a watering time
// expects an array of times
// returns the updated schedule
router.post('/:id', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try {    
        const { id } = req.params;
        //const times = [...req.body.times];
        const times = [5, 4];
        for (let i = 0; i < times.length; i++) {
          const wateringId = await plantDb.addWatering(id, times[i]);
          console.log(id)
          const [notification] = await notifications.addNotification(wateringId);
          notifier(notification);
          console.log('notification',notification)
        }
        const schedule = await plantDb.getWateringSchedule(id);
        res.status(200).json({post: schedule});
    } catch (err) {
        res.status(500).json(err);
    }
    
});
// Get a plant's watering schedule
router.get('/:id/schedule', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try {
            const schedule = await plantDb.getWateringSchedule(req.params.id);
            if (schedule.length) {
              res.status(200).json(schedule);
              console.log(schedule);
            } else {
              res.status(400).json({error:'there is no schedule'
              });
            }
    } catch (err) {
            res.status(500).json({ error: `there was an error accessing the db: ${err}` });
    }
});

// deletes plant's entire watering schedule
router.delete('/:id/schedule', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try{
        const response = await plantDb.deleteWateringById(req.params.id);
        console.log(response);
        res.status(200).json({ message: 'the schedule is deleted' });
    } catch (err) {
        res.status(500).json({ error: `there was an error deleting the schedule: ${err}` });
    }
});
// delete a specific watering time
// returns the modified watering schedule
router.delete('/:id/schedule/:waterId', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try {
        const count = await plantDb.deleteWateringTime(req.params.waterId);
        if (count) {
          const schedule = await plantDb.getWateringSchedule(req.params.id);
          res.status(200).json(schedule);
        }
      } catch (err) {
        res.status(500).json({
          error: `there was an error deleting the watering time: ${err}`
        });
      }
});

module.exports = router;

