const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport'),
      config = require('../config/config.json')

router.post('/get-user-information', function(req, res, next) {
    passport.authenticate('userStrategy', config.session, function(err, user) {
      if (user){
          User.findById(req.body.user_id, function (err, user) {
              if(err) return res.sendStatus(500);
              else return res.send(user)
          })
      }else{
        return res.sendStatus(401);
      }
    })(req, res, next);
  });

  router.post('/save-user', function(req, res, next) {
    passport.authenticate('userStrategy', config.session, function(err, user) {
      if (user){
            User.updateOne({ _id: req.body._id}, {$set: { first_name: req.body.first_name, last_name: req.body.last_name,
            email: req.body.email, password: req.body.password, phone_number: req.body.phone_number }}, (err) => {
                if(err){
                    console.log(err);
                    res.sendStatus(500)
                  }
                else{
                  res.sendStatus(200)
                }
            })
      }else{
        return res.sendStatus(401);
      }
    })(req, res, next);
  });

module.exports = router;