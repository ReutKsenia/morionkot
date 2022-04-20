const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const User = Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }, 
  first_name: String,
  last_name: String,
  phone_number: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

User.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

User.pre('updateOne', function (next) {
  const user=this.getUpdate().$set;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          console.log(err);
          return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          user.password = hash;
           next();
        });
    });
});

User.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error);
    callback(null, matches);
  });
};

module.exports = mongoose.model('user', User);