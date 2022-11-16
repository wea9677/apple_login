const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const bodyParser = require('body-parser');
// const googlestrategy = require('');
const session = require('express-session');
const UserRouter = require('./router/userRouter');
const path = require('path');
const app = express();
dotenv.config();
const passport = require('passport');
const port = process.env.PORT
const appleConfig = require('./config/config.json');
const AppleAuth = require('apple-auth');
const auth = new AppleAuth(appleConfig, path.join(__dirname, `./config${appleConfig.private_key_path}`));
/**
 * body parser
 */
app.use(express.json());



app.use(bodyParser.urlencoded({extended: true}));

/**
 * Middleware
 */

//  app.use(session('secret'));
app.use(session({ 
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
  }));
 app.use(passport.initialize());
 app.use(passport.session());

/**
 * Router
 */

 app.get("/", (req, res) => {
    console.log( Date().toString() + "GET /");
    res.send(`<a href="${auth.loginURL()}">Sign in with Apple</a>`);
    console.log('지나가나요')
});

app.get('/auth/apple', (req, res) =>{
    if(req.user) return res.redirect('/');
    fs.readFile('./view/login.html', (error, data)=>{
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }
        res.writeHead(200, {"Content-type" : "text/html"});
        res.end(data);
    });
    
});

// app.get("/", (req, res) => {
//     res.send("<a href=\"/login\">Sign in with Apple</a>");
// });



app.use('/auth', express.urlencoded({ extended: false }), UserRouter)



/**
 * Server listning
 */
const server = app.listen(port, () =>{
    console.log(port,"번 포트에서 실행")
});