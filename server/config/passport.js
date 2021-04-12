const PassportJWT = require('passport-jwt'),
      ExtractJWT = PassportJWT.ExtractJwt,
      Strategy = PassportJWT.Strategy,
      config = require('./config.json'),
      Employee = require('../models/employee'),
      User = require('../models/user'),
      parameters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };
    
    const adminStrategy = new Strategy(parameters, (payload, done) => {
        Employee.findOne({ _id: payload.employee._id }, (error, employee) => {
            if(error) return done(error, false);
            if(employee) {
                if(payload.role == 'admin') {done(null, employee);}
                else { done(null, false);}
            }
            else {done(null, false);}
        });
    });

    const managerStrategy = new Strategy(parameters, (payload, done) => {
        Employee.findOne({ _id: payload.employee._id }, (error, employee) => {
            if(error) return done(error, false);
            if(employee) {
                if(payload.role == 'manager') {done(null, employee);}
                else { done(null, false);}
            }
            else {done(null, false);}
        });
    });

    const adminManagerStrategy = new Strategy(parameters, (payload, done) => {
        Employee.findOne({ _id: payload.employee._id }, (error, employee) => {
            if(error) return done(error, false);
            if(employee) {
                if(payload.role == 'manager' || payload.role == 'admin') {done(null, employee);}
                else { done(null, false);}
            }
            else {done(null, false);}
        });
    });

    const courierStrategy = new Strategy(parameters, (payload, done) => {
        Employee.findOne({ _id: payload.employee._id }, (error, employee) => {
            if(error) return done(error, false);
            if(employee) {
                if(payload.role == 'courier') {done(null, employee);}
                else { done(null, false);}
            }
            else {done(null, false);}
        });
    });

    const userStrategy = new Strategy(parameters, (payload, done) => {
        User.findOne({ id: payload._id }, (error, user) => {
            if(error) return done(error, false);
            if(user) { done(null, user);}
            else done(null, false);
        });
    })
module.exports = (passport) => {
    passport.use('adminStrategy', adminStrategy);
    passport.use('managerStrategy', managerStrategy);
    passport.use('courierStrategy', courierStrategy);
    passport.use('adminManagerStrategy', adminManagerStrategy);
    passport.use('userStrategy', userStrategy);
}