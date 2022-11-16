const passport = require('passport');
const apple = require('./passport_apple')


module.exports = () =>{
// const config = require('../config/config.json')
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

apple();

};

