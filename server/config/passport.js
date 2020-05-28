const PassportJWT = require('passport-jwt'),
      ExtractJWT = PassportJWT.ExtractJwt,
      Strategy = PassportJWT.Strategy,
      config = require('./config.json'),
      Admin = require('../models/admin');

module.exports = (passport) => {
    //const admin = Admin;
    const parameters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };
    passport.use(new Strategy(parameters, (payload, done) => {
        Admin.findOne({ id: payload.id }, (error, admin) => {
            if(error) return done(error, false);
            if(admin) done(null, user);
            else done(null, false);
        });
    }));
}