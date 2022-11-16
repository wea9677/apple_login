require('dotenv').config();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const appleAuth = require('apple-auth');



/**
 * apple login
 */

const appleKey = {
  client_id: process.env.APPLE_SERVICE_ID,
  key_id: process.env.APPLE_KEY_NAME, 
  redirect_uri: process.env.APPLE_REDIRCT_URL, // 등록한 redirect URL
  private_key_path: process.env.APPLE_KEY_PATH, // appleAuth 에 파라미터로 들어가기만 하면 된다
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

/**
 * apple login
 */

const appleSign = async (req, res, next) =>{
  try {
      const response = await appleAuth.AppleAuthAccessToken(req.body.code);
      const idToken = jwt.decode(response.id_token);

      //처음 로그인 = 회원가입
      if (req.body.user){
        const user = {};
        user.id = idToken.sub;
        user.email = idToken.email;
        const {name} = JSON.parse(req.body.user);
        user.name = name; // name = {fistname, lastname}
        const username = name.lastname + name.firstname;
        return await UserDao.appleSign(user.id, username, user.email);
      } else {
        //회원 가입이 되어 있는 경우
        //idToken.sub로 회원 가입이 되어있는지 체크 후 로그인 여부 결정
        return {accessToken:'testtoken', refreshToken:'testRefresh'};
      }
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