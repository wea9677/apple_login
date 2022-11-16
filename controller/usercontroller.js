require('dotenv').config();

const jwt = require('jsonwebtoken')
const passport = require('passport');



/**
 * apple login
 */

const appleKey = {
  client_id: 'yourClientID',
  team_id: 'yourTeamID',
  key_id: 'yourKeyID', 
  redirect_uri: 'https://test.glitch.me/redirect', // 등록한 redirect URL
  private_key_path: '키 파일 이름', // appleAuth 에 파라미터로 들어가기만 하면 된다
  scope: 'name email',
};
const appleAuth = new AppleAuth(appleKey, fs.readFileSync('키파일 경로').toString(), 'text');






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
    googleCallback, checkMe
  };