const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const AppleStrategy = require('passport-apple').Strategy;
const cors = require('cors');
const app = express();

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'keyboard cat'
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// console.log('어디에있니')
// console.log(path.parse( 'AuthKey_874WAUN372.p8', ));
// console.log(path.join(__dirname, './config/AuthKey_874WAUN372.p8'));
passport.use(
    'apple',
    new AppleStrategy(
        {
            clientID: 'com.herokuapp.applelogin',
            teamID: '3L7RW74HCJ',
            keyID: 'AGNLP55NBT',
            privateKeyString : `-----BEGIN PRIVATE KEY-----
            MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgwI65IK8xMkJ2gOMV
            EoMBjFzlslUrIb7CCh/yg1dcTgigCgYIKoZIzj0DAQehRANCAASuAP+Ni4skreFO
            zHyy68NkyHXptZes/ckRp9pAV8W5QJtIp3uJ5AsVynXpDbTJjl8NslI49Syi73p3
            hJXQvUN+
            -----END PRIVATE KEY-----`,
            // privateKeyLocation: fs.readFileSync(path.join(__dirname,'./config/AuthKey_AGNLP55NBT.p8')),
            passReqToCallback: true,
            callbackURL: 'https://applelogint.herokuapp.com/auth/apple',
            
        },
        (accessToken, refreshToken, profile, done) => {
            // const {id, name: { firstName, lastName }, email} = profile;
            console.log(accessToken, refreshToken, profile, done)
            // Create or update the local user here.
            // Note: name and email are only submitted on the first login!

            done(null, {id, email, name: { firstName, lastName }});
        }
    )
);


app.use(cors());



app.get('/', (req, res) => {
    res.send('<a href="/login">Sign in with Apple</a>');
});

app.get("/login", passport.authenticate('apple'), (req, res) =>{
    
});

app.post("/auth/apple", function(req, res, next) {
	passport.authenticate('apple', function(err, user, info)  {
		if (err) {
			if (err == "AuthorizationError") {
                console.log('auth')
				res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
				<a href=\"/login\">Sign in with Apple</a>");
			} else if (err == "TokenError") {
                console.log('token')
				res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
				<a href=\"/login\">Sign in with Apple</a>");
			} else {
				res.send(err);
			}
		} else {
			if (req.body.user) {
				// Get the profile info (name and email) if the person is registering
				res.json({
					user: req.body.user,
					idToken: user
				});
			} else {
				res.json(user);
			}			
		}
	})(req, res, next);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});







//==========================================================================//
// const express = require('express');
// const bodyParser = require('body-parser')
// const app = express();
// const passport = require('passport');
// const AppleStrategy = require ('passport-apple');
// const session = require('express-session');
// // const AppleStrategy = require('passport-apple');

// app.use(session({ 
//     secret: 'SECRET',
//     resave: true,
//     saveUninitialized: true
//   }));

// app.get("/", (req, res) => {
//     res.send("<a href=\"/login\">Sign in with Apple</a>");
// });

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: true }));

// passport.serializeUser(function(user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
// });

// passport.use(new AppleStrategy({
//         clientID: "com.herokuapp.applelogintest",
//         teamID: "3L7RW74HCJ",
//         callbackURL: "https://applelogint.herokuapp.com/",
//         keyID: "874WAUN372",
//         privateKeyLocation: `-----BEGIN PRIVATE KEY-----
//         MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgC8dUt+CSkb80sHmj
//         NwoiiwOlyoQ7g01O/PhwhCg3ycagCgYIKoZIzj0DAQehRANCAASvpgFDPpHzpkuh
//         4wEz81MHdG47d8UD817LGd5GKKGZSTsHxP6cUrnRnKZ50dqabyWGkvWFPZ83gWbU
//         vj87gdLB
//         -----END PRIVATE KEY-----`
//     }, async function(req, accessToken, refreshToken, idToken, profile , cb) {
//         console.log(req, accessToken, refreshToken, idToken, profile , cb )
//         // Here, check if the idToken.sub exists in your database!
//     try {
//         if (req.body && req.body.user) {
//             done(null, req.body, req.body.user); // 로그인 인증 완료
// 		console.log(req.body.user, "로그인 성공");

// 	} else {
//         const newUser = await user.create({
//             email : idToken
//         })
//         console.log(newUser, '새로운 유저')
//     }
//     	cb(null, idToken);
//         console.log(newUser, '새로운 유저')
//         console.log(idToken);
//     } catch (error) {
//         console.error(error)
//     }
       
//     }));

// app.get("/login", passport.authenticate('apple'));
// console.log('11')
// app.post("/auth/apple/callback", function(req, res, next) {
// 	passport.authenticate('apple', function(err, user, info) {
// 		console.log('passport callback point')
//         console.log(request_id)
//         if (err) {
// 			if (err == "AuthorizationError") {
// 				res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
// 				<a href=\"/login\">Sign in with Apple</a>");
// 			} else if (err == "TokenError") {
// 				res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
// 				<a href=\"/login\">Sign in with Apple</a>");
// 			} else {
// 				res.send(err);
// 			}
// 		} else {
// 			if (req.body.user) {
// 				res.json({
// 					user: req.body.user,
// 					idToken: user
// 				});
// 			} else {
// 				res.json(user);
// 			}		
//             console.log(request_id)	
// 		}
// 	})(req, res, next);
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`App is running on port ${ PORT }`);
// });