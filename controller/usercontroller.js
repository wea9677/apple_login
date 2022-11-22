require('dotenv').config();
const jwt = require('jsonwebtoken');
const { authenticate } = require('passport');
const passport = require('passport');
const getAppleToken = require('../passport/passport_apple');


/**
 * google login
 */

const googleCallback = (req, res, next) =>{
    try {
        passport.authenticate(
            'google',
            { failureRedirect: "/" },
            (err, user, info) => {
              if (err) return next(err);
      
              // const { userImageURL } = images;
              const { user_id, user_name, user_nickname } = user;
              const token = jwt.sign({ user_id }, process.env.MY_KEY, {
                expiresIn: "24h",
              });
      
              result = {
                user_id,
                token,
                nickname,
              };
      
              res.send({ user: result });
            }
          )(req, res, next);
    } catch (error) {
        res.status(400).send({errorMessage: "구글 로그인 실패"});
    }
};

/**
 * apple login
 */

 const appleCallback =  async (req, res, next) =>{
  try {
        console.log( Date().toStriong() + "GET /auth");
        const response = await auth.accessToken(req.body.code);
        //     if (err) return next(err);
        //     console.log("지나가나요")
        //     // const { userImageURL } = images;
        //     const { email } = user;
        //     const token = jwt.sign({ email }, process.env.MY_KEY, {
        //       expiresIn: "24h",
        //     });
    
        //     result = {
        //       email,
        //       token,
        //     };
    
        //     res.send({ user: result });
        //   }
        // )(req, res, next);
  } catch (error) {
      res.status(400).send({errorMessage: "애플 로그인 실패"});
  }
};



//login check
async function checkMe(req, res) {
    const { user_id, user_name, user_nickname } = res.locals;
    try {
      res.send({
        success: true,
        user_id,
        user_name,
        user_nickname
      });
    } catch (error) {
      res.status(400).send({ errorMessage: "로그인 인증실패" });
    }
  }

  module.exports = {
    googleCallback, checkMe, appleCallback
  };