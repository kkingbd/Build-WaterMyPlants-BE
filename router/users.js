const express = require('express');
const router = express.Router();
const userDb= require('../data/userModel.js');
const {authenticate} = require('../auth/auth.js');

router.get('/',authenticate, (req, res) => {
  userDb.find()
      .then(users => {
          res.json(users);
      })
      .catch(err => {
          res.status(500).send(err);
      })
});

module.exports = router;