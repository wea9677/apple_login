const passport = require('passport');
import AppleStrategy from 'passport-apple';
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
        privateKeyLocation: ""
    }, function(req, accessToken, refreshToken, idToken, profile , cb) {
        // Here, check if the idToken.sub exists in your database!
    	if (req.body && req.body.user) {
      		// Register your user here!
		console.log(req.body.user);
	}
    	cb(null, idToken);
    }));