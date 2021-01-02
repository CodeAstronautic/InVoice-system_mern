const router = require('express').Router();
const Month = require('../models/month');
const passport = require("passport")


   
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
   Month.find()
        .then(result => res.status(200).json(result))
        .catch(() => res.status(404).json({notFound: 'month doesn\'t exist'}));
});
  
router.post('/addMonth', passport.authenticate('jwt', {session: false}), (req, res) => {
      const monthData = {};
     monthData.month = req.body.month;
      const month = new Month(monthData);
      console.log(month)
      month.save()
          .then(() => res.status(201).json(month))
          .catch(err => res.status(400).json(err));

  });
    
  module.exports = router; 