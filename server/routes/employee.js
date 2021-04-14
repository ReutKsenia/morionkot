const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const Role = require('../models/role');
const passport = require('passport'),
      config = require('../config/config.json');
const Order = require('../models/order');

// router.post('/get-user', function(req, res, next) {
//     passport.authenticate('userStrategy', config.session, function(err, user) {
//       if (user){
//           User.findById(req.body.user_id, function (err, user) {
//               if(err) return res.sendStatus(500);
//               else return res.send({ user: user })
//           })
//       }else{
//         return res.sendStatus(401);
//       }
//     })(req, res, next);
//   });

  router.post('/save-admin', function(req, res, next) {
    passport.authenticate('adminStrategy', config.session, function(err, employee) {
      if (employee){
            Employee.updateOne({ _id: employee._id}, {$set: { name: req.body.name, login: req.body.login, password: req.body.password }}, (err) => {
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

  router.get('/get-admin-information', function(req, res, next) {
    passport.authenticate('adminStrategy', config.session, function(err, employee) {
      if (employee){
        return res.send(employee)
      }else{
        return res.sendStatus(401);
      }
    })(req, res, next);
  });

  router.post('/save-manager', function(req, res, next) {
    passport.authenticate('managerStrategy', config.session, function(err, employee) {
      if (employee){
            Employee.updateOne({ _id: employee._id}, {$set: { name: req.body.name, login: req.body.login, password: req.body.password }}, (err) => {
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

  router.get('/get-manager-information', function(req, res, next) {
    passport.authenticate('managerStrategy', config.session, function(err, employee) {
      if (employee){
        return res.send(employee)
      }else{
        return res.sendStatus(401);
      }
    })(req, res, next);
  });

  router.post('/save-courier', function(req, res, next) {
    passport.authenticate('courierStrategy', config.session, function(err, employee) {
      if (employee){
            Employee.updateOne({ _id: employee._id}, {$set: { name: req.body.name, login: req.body.login, password: req.body.password }}, (err) => {
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

  router.get('/get-courier-information', function(req, res, next) {
    passport.authenticate('courierStrategy', config.session, function(err, employee) {
      if (employee){
        return res.send(employee)
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

  router.get('/all-managers', function(req, res, next) {
    passport.authenticate('adminStrategy', config.session, function(err, employee) {
      if (employee){
        Role.findOne({ role: 'manager' }, (error, role) => {
          if (error) throw error;
          else {
            Employee.find({ role_id: role._id}, function (err, managers) {
              if(err) return res.sendStatus(500);
              else return res.send({ managers: managers })
          });}
        });
      }else{
        return res.sendStatus(401);
      }
    })(req, res, next);
  });

  router.post('/change-courier', function(req, res, next) {
    passport.authenticate('managerStrategy', config.session, function(err, employee) {
      if (employee){
        Order.updateOne({_id: req.body.order._id}, {$set: {courier_id: req.body.courier._id}}, (err, order) => {
          if(err) throw error;
          else return res.send({ order: order })
        })
      }else{
        return res.sendStatus(401);
      }
    })(req, res, next);
  });

  router.post('/delete-manager', function(req, res, next) {
    passport.authenticate('adminStrategy', config.session, function(err, employee) {
      if (employee){
            Employee.remove({ _id: req.body._id}, (err) => {
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

  router.post('/delete-courier', function(req, res, next) {
    passport.authenticate('adminStrategy', config.session, function(err, employee) {
      if (employee){
            Employee.remove({ _id: req.body._id}, (err) => {
                if(err){
                    console.log(err);
                    res.sendStatus(400)
                  }
                else{
                  Order.update({ courier_id: req.body._id}, {$set: { courier_id: null }}, function(err) {
                    if(err){
                      console.log(err);
                      res.sendStatus(400)
                    }
                    else res.sendStatus(200)
                  })
                  
                }
            })
      }else{
        return res.sendStatus(401);
      }
    })(req, res, next);
  });

module.exports = router;