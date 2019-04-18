const express = require('express');
const router = express.Router();
const userDb= require('../data/userModel.js');
const plantDb= require('../data/plantsModel.js');
const {authenticate, validUser ,validUserId} = require('../auth/auth.js');

router.get('/',authenticate, async (req, res) => {
  await userDb.find()
      .then(users => {
          res.json(users);
      })
      .catch(err => {
          res.status(500).send(err);
      })
});

router.delete('/:id', authenticate, validUserId, validUser, (req, res) => {
  const id =req.params.id;
  userDb.deleteUser(id)
  .then( confirm => {
    res.status(200).json({message: `${confirm} id deleted` })
   })
})

router.get('/:id', authenticate, validUserId, validUser, async(req, res)=>{
    try{
        const user = await userDb.findById(req.params.id);
        res.status(200).json(user);
    }catch (err){
        res.status(500).json({ error: `there was an error: ${err}` });
    }
});
// get all user's plants
router.get('/:id/plants', authenticate, validUserId, validUser, async (req, res) => {
    try {
      const { id } = req.params;
      const plantList = await plantDb.findPlant(id);
      for (let i = 0; i < plantList.length; i++) {
        plantList[i].schedule = await plantDb.getWateringSchedule(plantList[i].id);
      }
      res.status(200).json(plantList);
    } catch (err) {
      res
        .status(500)
        .json({ error: `there was an error accessing the db: ${err}` });
    }
  }
);

router.post('/:id/plants', authenticate, validUserId, validUser, async (req, res) => {
      try {
        const {id}  = req.params;
        const plant = req.body;
        if (!plant.name) {
          res.status(404).json({ error: 'Please provide the name of your plant' });
        } else {
          const newPlant = await plantDb.addPlant(id, plant);
          res.status(200).json(newPlant);
        }
      } catch (err) {
        res.status(500).json({ planterror: `${err}` });
      }
    }
  );

router.put('/:id',authenticate, validUserId, validUser, async (req, res) => {
    try {
        const {username, password, email, phone} = req.body;
        const {id} =req.params;
        if (!username) {
          res.status(400).json({ message: "Please provide all the required information of the user." })
       }
        const count = await userDb.update(id, req.body)
        .then(user=>{
          if (user) {
            res.status(200).json(req.body)
          } else {   
            res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
          })    
    } catch (err) {
      res.status(500).json({ error: `there was an error accessing the db: ${err}` });
    }
  }
);

module.exports = router;