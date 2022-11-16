require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');




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

const appleSign = async (req, res, next) =>{
  try {
    passport.authenticate('apple', function(err, user, info) {
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
  } catch (error) {
      throw new Error(500, err);
    
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
    googleCallback, checkMe, appleSign
  };