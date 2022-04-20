const jwt = require('jsonwebtoken'),
      config = require('../config/config.json');

const api = {};

api.loginEmployee = (Employee, Role) => (req, res) => {
  Employee.findOne({ login: req.body.login }, (error, employee) => {
  if (error) throw error;
  if (!employee) res.status(401).send({ success: false, message: 'Authentication failed. Employee not found.' });
  else {
    employee.comparePassword(req.body.password, (error, matches) => {
      if (matches && !error) {
        Role.findById(employee.role_id, (error, role) => {
          if (error) throw error;
          if (role.role != req.body.role) res.status(401).send({ success: false, message: 'Authentication failed. Wrong position.' });
          else {
          const token = jwt.sign({ employee: employee, role: role.role}, config.secret);
          res.json({ success: true, message: 'Token granted', token, employee: employee, role: role.role });
          }
        })
      } else {
        res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
      }
    });
  }
});
}

api.signupEmployee = (Employee, Role) => (req, res) => {
  if (!req.body.login || !req.body.password) res.json({ success: false, message: 'Please, pass a username and password.' });
  else {
    Role.findOne({ role: req.body.role }, (error, role) => {
      if (error) throw error;
      else {
        const newEmployee = new Employee({
          name: req.body.name,
          login: req.body.login,
          password: req.body.password,
          role_id: role._id
        });
        newEmployee.save((error, employee) => {
          if (error) return res.status(400).json({ success: false, message:  'Username already exists.' });
          else {
            const token = jwt.sign({ employee: employee, role: role.role}, config.secret);
          res.json({ success: true, message: 'Account created successfully', token, employee: employee, role: role.role });
          }
        })
      }
    })
    
  }
}

api.loginUser = (User) => (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
  if (error) throw error;
  if (!user) res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
  else {
    console.log(user);
      user.comparePassword(req.body.password, (error, matches) => {
      if (matches && !error) {
        const token = jwt.sign({ user }, config.secret);
        res.json({ success: true, message: 'Token granted', token, user: user });
      } else {
        res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
      }
    });
  }
});
}

api.signupUser = (User) => (req, res) => {
  if (!req.body.email || !req.body.password) res.json({ success: false, message: 'Please, pass a username and password.' });
  else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: ''
    });
    newUser.save((error, user) => {
      if (error) return res.status(400).json({ success: false, message:  'Username already exists.' });
      else {
        const token = jwt.sign({ user }, config.secret);
        res.json({ success: true, message: 'Account created successfully', token, user: user });
      }
    })
  }
}

api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ');

    if (split.length === 2) return split[1];
    else return null;
  } else return null;
}

module.exports = api;