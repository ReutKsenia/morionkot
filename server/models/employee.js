const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const Employee = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role'
  },
});

Employee.pre('save', function (next) {
  const employee = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(employee.password, salt, (error, hash) => {
        if (error) return next(error);
        employee.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

Employee.pre('updateOne', function (next) {
  const employee=this.getUpdate().$set;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          console.log(err);
          return next(err);
        }
        bcrypt.hash(employee.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          employee.password = hash;
           next();
        });
    });
});

Employee.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error);
    callback(null, matches);
  });
};

module.exports = mongoose.model('employee', Employee);