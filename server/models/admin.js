const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
 
const Admin = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

Admin.pre('updateOne', function (next) {
    const admin = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(admin.password, salt, (error, hash) => {
        if (error) return next(error);
        admin.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
});

Admin.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, matches) => {
      if (error) return callback(error);
      callback(null, matches);
    });
};
  
module.exports = mongoose.model('admin', Admin);