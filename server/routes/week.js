const router = require('express').Router();
const Week = require('../models/week');
const passport = require("passport")

router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
   Week.find()
        .then(result => res.status(200).json(result))
        .catch(() => res.status(404).json({notFound: 'week doesn\'t exist'}));
});

router.post('/addWeek', passport.authenticate('jwt', {session: false}), (req, res) => {
      const weekData = {};
      weekData.week = req.body.week;

      const week = new Week(weekData);
      console.log(week)
      week.save()
          .then(() => res.status(201).json(week))
          .catch(err => res.status(400).json(err));

  });
  module.exports = router;