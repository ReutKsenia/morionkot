const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      config = require('../config/config.json');

const api = {};

api.login = (Admin) => (req, res) => {
    Admin.findOne({ login: req.body.login }, (error, admin) => {
    if (error) throw error;
    if (!admin) res.status(401).send({ success: false, message: 'Authentication failed. Admin not found.' });
    else {
        admin.comparePassword(req.body.password, (error, matches) => {
        if (matches && !error) {
          const token = jwt.sign({ admin }, config.secret);
          res.json({ success: true, message: 'Token granted', token, admin: admin });
        } else {
          res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
}

api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ');

    if (split.length === 2) return split[1];
    else return null;
  } else return null;
}

module.exports = api;