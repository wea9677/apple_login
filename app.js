const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const passport = require('passport');
const AppleStrategy = require ('passport-apple');
const session = require('express-session');
// const AppleStrategy = require('passport-apple');

app.use(session({ 
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
  }));

app.get("/", (req, res) => {
    res.send("<a href=\"/login\">Sign in with Apple</a>");
});

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

passport.use(new AppleStrategy({
        clientID: "com.herokuapp.applelogintest",
        teamID: "3L7RW74HCJ",
        callbackURL: "https://applelogint.herokuapp.com/",
        keyID: "874WAUN372",
        privateKeyLocation: `-----BEGIN PRIVATE KEY-----
        MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgC8dUt+CSkb80sHmj
        NwoiiwOlyoQ7g01O/PhwhCg3ycagCgYIKoZIzj0DAQehRANCAASvpgFDPpHzpkuh
        4wEz81MHdG47d8UD817LGd5GKKGZSTsHxP6cUrnRnKZ50dqabyWGkvWFPZ83gWbU
        vj87gdLB
        -----END PRIVATE KEY-----`
    }, async function(req, accessToken, refreshToken, idToken, profile , cb) {
        console.log(req, accessToken, refreshToken, idToken, profile , cb )
        // Here, check if the idToken.sub exists in your database!
    try {
        if (req.body && req.body.user) {
            done(null, req.body, req.body.user); // 로그인 인증 완료
		console.log(req.body.user, "로그인 성공");

	} else {
        const newUser = await user.create({
            email : idToken
        })
        console.log(newUser, '새로운 유저')
    }
    	cb(null, idToken);
        console.log(newUser, '새로운 유저')
        console.log(idToken);
    } catch (error) {
        console.error(error)
    }
       
    }));

app.get("/login", passport.authenticate('apple'));
console.log('11')
app.post("/auth", function(req, res, next) {
	passport.authenticate('apple', function(err, user, info) {
		console.log('passport callback point')
        console.log(request_id)
        if (err) {
			if (err == "AuthorizationError") {
				res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
				<a href=\"/login\">Sign in with Apple</a>");
			} else if (err == "TokenError") {
				res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
				<a href=\"/login\">Sign in with Apple</a>");
			} else {
				res.send(err);
			}
		} else {
			if (req.body.user) {
				res.json({
					user: req.body.user,
					idToken: user
				});
			} else {
				res.json(user);
			}		
            console.log(request_id)	
		}
	})(req, res, next);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});