const passport = require('passport');
const session = require('express-session');
const AppleStrategy = require('passport-apple');

// const config = require('../config/config.json')
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

passport.use(new AppleStrategy({
        clientID: "app.netlify.applelogint",
        callbackURL: "https://applelogint.herokuapp.com/auth/apple",
        keyID: "N22NKH9NF3",
        privateKeyLocation: "./maria/config/AuthKey_N22NKH9NF3.p8"
    }, function(req, accessToken, refreshToken, idToken, profile , cb) {
        // Here, check if the idToken.sub exists in your database!
    	if (req.body && req.body.user) {
      		// Register your user here!
		console.log(req.body.user);
	}
    	cb(null, idToken);
    }));