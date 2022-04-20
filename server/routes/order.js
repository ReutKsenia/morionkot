const express = require('express');
const router = express.Router();
const order = require('../api/order');
const Order = require('../models/order');
const Cart = require('../models/cart');
const OrderStatus = require('../models/orderStatus');
const Role = require('../models/role');
const api = require('../api/auth')
const passport = require('passport'),
  config = require('../config/config.json');

router.post('/addOrder', order.addOrder(Order, Cart, OrderStatus));

router.get('/orders-unexecuted-for-manager', function orderUnexecutedForManager(req, res, next) {
  passport.authenticate('managerStrategy', config.session, function (err, employee) {
    if (employee) {
      OrderStatus.find({ sent_to_courier: false, canceled: false }).populate({
        path: 'order_id',
        model: 'order',
        populate: {
          path: 'courier_id',
          model: 'employee'
        }
      }).exec(function (err, orders) {
        if (err) {
          return res.sendStatus(401)
        } else {
          return res.send({ orders: orders })
        }
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.get('/orders-executed-for-manager', function ordersExecutedForManager(req, res, next) {
  passport.authenticate('managerStrategy', config.session, function (err, employee) {
    if (employee) {
      OrderStatus.find({ visible_for_manager: true, $or: [{ sent_to_courier: true }, { canceled: true }] }).populate({
        path: 'order_id',
        model: 'order',
        populate: {
          path: 'courier_id',
          model: 'employee'
        }
      }).exec(function (err, orders) {
        if (err) {
          return res.sendStatus(400)
        } else {
          return res.send({ orders: orders })
        }
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/delete-order-for-manager', function deleteOrderForManager(req, res, next) {
  passport.authenticate('managerStrategy', config.session, function (err, employee) {
    if (employee) {
      OrderStatus.findById(req.body._id).populate({
        path: 'order_id',
        model: 'order',
        populate: {
          path: 'courier_id',
          model: 'employee'
        }
      }).exec(function (err, ord) {
        if (err) return console.log(err);
        if (ord.order_id.user_id) {
          OrderStatus.updateOne({ _id: req.body._id }, { $set: { visible_for_manager: false } }, (err) => {
            if (err) {
              res.sendStatus(400)
            }
            else {
              res.sendStatus(200)
            }
          })
        }
        else {
          ord.remove({ _id: req.body._id }, function (err) {
            if (err) return console.log(err);
            else {
              Order.remove({ _id: ord.order_id._id }, function (err) {
                if (err) return console.log(err);
                else {
                  Cart.remove({ order_id: ord.order_id._id }, function (err) {
                    if (err) return console.log(err);
                    else res.sendStatus(200);
                  })
                }
              })
            }
          })
        }
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/delete-order-for-courier', function deleteOrderForCourier(req, res, next) {
  passport.authenticate('courierStrategy', config.session, function (err, employee) {
    if (employee) {
      OrderStatus.findById(req.body._id).populate({
        path: 'order_id',
        model: 'order',
        populate: {
          path: 'courier_id',
          model: 'employee'
        }
      }).exec(function (err, ord) {
        if (err) return console.log(err);
        else {
          OrderStatus.updateOne({ _id: req.body._id }, { $set: { visible_for_courier: false } }, (err) => {
            if (err) {
              res.sendStatus(400)
            }
            else {
              res.sendStatus(200)
            }
          })
        }
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/change-status-order', function changeStatusOrder(req, res, next) {
  passport.authenticate('managerStrategy', config.session, function (err, employee) {
    if (employee) {
      OrderStatus.updateOne({ _id: req.body._id }, { $set: { is_formed: req.body.is_formed, sent_to_courier: req.body.sent_to_courier, canceled: req.body.canceled, } }, (err, order) => {
        if (err) {
          res.sendStatus(500)
        }
        else {
          res.send({ order: order });
        }
      })
    } else {
      return res.sendStatus(401); 
    }
  })(req, res, next);
});

router.post('/change-status-order-courier', function changeStatusOrderCourier(req, res, next) {
  passport.authenticate('courierStrategy', config.session, function (err, employee) {
    if (employee) {
      OrderStatus.updateOne({ _id: req.body._id }, { $set: { delivered: req.body.delivered } }, (err, order) => {
        if (err) {
          res.sendStatus(500)
        }
        else {
          res.send({ order: order });
        }
      })
    } else {
      return res.sendStatus(401); 
    }
  })(req, res, next);
});

router.get('/orders-unexecuted-for-courier', function ordersUnexecutedForCourier(req, res, next) {
  passport.authenticate('courierStrategy', config.session, function (err, employee) {
    if (employee) {
      console.log(employee);
      OrderStatus.find({ visible_for_courier: true}).populate({
        path: 'order_id',
        model: 'order',
        match: { courier_id: employee._id },
        populate: {
          path: 'courier_id',
          model: 'employee',
        }
      }).exec(function (err, orders) {
        if (err) {
          return res.sendStatus(400)
        } else {
          let orderForCourier = new Array();;
          for(let i=0; i<orders.length; i++){
            if(orders[i].order_id) orderForCourier.push(orders[i]);
          }
          return res.send({ orders: orderForCourier })
        }
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.get('/orders-unexecuted-for-user', function ordersUnexecutedForUser(req, res, next) {
  passport.authenticate('userStrategy', config.session, function (err, user) {
    if (user) {
      console.log(user);
      OrderStatus.find({ received: false, canceled: false }).populate({
        path: 'order_id',
        model: 'order',
        match: { user_id: user._id },
        populate: {
          path: 'courier_id',
          model: 'employee',
        }
      }).exec(function (err, orders) {
        if (err) {
          return res.sendStatus(400)
        } else {
          let orderForUser = new Array();;
          for(let i=0; i<orders.length; i++){
            if(orders[i].order_id) orderForUser.push(orders[i]);
          }
          return res.send({ orders: orderForUser })
        }
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.get('/orders-executed-for-user', function ordersExecutedForUser(req, res, next) {
  passport.authenticate('userStrategy', config.session, function (err, user) {
    if (user) {
      console.log(user);
      OrderStatus.find({$or: [{ received: true }, { canceled: true }] }).populate({
        path: 'order_id',
        model: 'order',
        match: { user_id: user._id },
        populate: {
          path: 'courier_id',
          model: 'employee',
        }
      }).exec(function (err, orders) {
        if (err) {
          return res.sendStatus(400)
        } else {
          let orderForUser = new Array();;
          for(let i=0; i<orders.length; i++){
            if(orders[i].order_id) orderForUser.push(orders[i]);
          }
          return res.send({ orders: orderForUser })
        }
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/received-order', function receivedOrder(req, res, next) {
  passport.authenticate('userStrategy', config.session, function (err, user) {
    if (user) {
      OrderStatus.updateOne({ _id: req.body._id }, { $set: { received: true } }, (err) => {
        if (err) {
          res.sendStatus(400)
        }
        else {
          res.sendStatus(200)
        }
      })
    } else {
      return res.sendStatus(401); 
    }
  })(req, res, next);
});

router.post('/cancel-order', function cancelOrder(req, res, next) {
  passport.authenticate('userStrategy', config.session, function (err, user) {
    if (user) {
      OrderStatus.updateOne({ _id: req.body._id }, { $set: { canceled: true } }, (err) => {
        if (err) {
          res.sendStatus(400)
        }
        else {
          res.sendStatus(200)
        }
      })
    } else {
      return res.sendStatus(401); 
    }
  })(req, res, next);
});

router.post('/product-from-cart', order.productsFromCart(Cart))

module.exports = router;