const express = require('express');
const dotenv = require('dotenv');
// const port = 3000
const http = require('http');
const bodyParser = require('body-parser');
// const config = require('./config/config.json');


const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
const config = {
    client_id : "com.herokuapp.applelogintest",
    redirect_url : "https://applelogint.herokuapp.com/auth/apple",
    response_type: "code id_token",
    state : "origin:web",
    scope : "name email",
    response_mode : "form_post",
    m : 11,
    v : "1.5.4"

}

const queryString = Object.entries(config).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
// console.log(queryString,'쿼리스트링')
// showLog()
app.get("/", (req, res) => {
    
    res.send(`<a href = https://appleid.apple.com/auth/authorize?${queryString}>Sign in with Apple</a>`);
    // console.log(queryString)/
    
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});