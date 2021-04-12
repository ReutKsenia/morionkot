const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const Role = require('../models/role');
const passport = require('passport'),
      config = require('../config/config.json')

router.post('/get-user', function(req, res, next) {
    passport.authenticate('userStrategy', config.session, function(err, user) {
      if (user){
          User.findById(req.body.user_id, function (err, user) {
              if(err) return res.sendStatus(500);
              else return res.send({ user: user })
          })
      }else{
        return res.sendStatus(401);
      }
    })(req, res, next);
  });

  router.post('/save-admin', function(req, res, next) {
    passport.authenticate('adminStrategy', config.session, function(err, employee) {
      if (employee){
            Employee.updateOne({ _id: employee._id}, {$set: { login: req.body.login, password: req.body.password }}, (err) => {
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

  router.get('/all-couriers', function(req, res, next) {
    passport.authenticate('adminManagerStrategy', config.session, function(err, employee) {
      if (employee){
        Role.findOne({ role: 'courier' }, (error, role) => {
          if (error) throw error;
          else {
            Employee.find({ role_id: role._id}, function (err, couriers) {
              if(err) return res.sendStatus(500);
              else return res.send({ couriers: couriers })
          });}
        });
      }else{
        return res.sendStatus(401);
      }
    })(req, res, next);
  });

module.exports = router;