const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
// const googlestrategy = require('');
const userRouter = require('./router/userRouter');
const app = express()
dotenv.config();

const port = process.env.PORT
/**
 * body parser
 */
app.use(express.json());


/**
 * Middleware
 */

/**
 * Router
 */

app.get('/', (req, res) =>{
   if(!req.user) return res.redirect('/auth/apple');
   fs.readFile('./view/main.html', (error, data) =>{
    if(error){
        console.log(error);
        return res.sendStatus(500);
    }
    res.writeHead(200, {"Content-type": "text/html"});
    res.end(data);
   });
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


app.use('/auth/apple', userRouter);




/**
 * Server listning
 */
const server = app.listen(port, () =>{
    console.log(port,"번 포트에서 실행")
});