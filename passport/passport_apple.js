require('dotenv').config();

const passport = require('passport');
const AppleStrategy = require('passport-apple');


module.exports = () => {



    passport.use(
        new AppleStrategy(
        {
            clientID: 'com.herokuapp.applelogintest',
            callbackURL: 'https://applelogint.herokuapp.com/',
            teamId: '3L7RW74HCJ',
            keyIdentifier: '874WAUN372',
            privateKeyPath: path.join(__dirname, process.env.APPLE_KEY_PATH)
      }, 
      
      async (accessToken, refreshToken, profile, done)=>{
        console.log("지나가나요????");
        console.log('apple profile', profile, accessToken, refreshToken);
        try {
            const exUser = await user.findOne({
                where:{email:profile.id, provider:'apple'},
            });

            if(exUser) {
                done(null, exUser);
            } else {
                const newUser = await user.create({
                    email : profile.email[0].value
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
    // passport.use(new AppleStrategy({
    //     clientID: "app.netlify.applelogint",
    //     teamID: "3L7RW74HCJ",
    //     callbackURL: "https://applelogint.herokuapp.com/auth/apple",
    //     keyID: "N22NKH9NF3",
    //     privateKeyLocation: process.env.APPLE_KEY_PATH,
    // }, async (req, accessToken, refreshToken, idToken, profile , cb) => {
    //      const exUser = await users.findOne({
    //                     // 
    //                     where : {snsId: profile.id},
    //                 });
    //     // Here, check if the idToken.sub exists in your database!
    //     try {
    //         const exUser = await user.findOne({
    //             // 
    //             where : {snsId: profile.id},
    //         });
            
    //         if (req.body && req.body.user) {
    //             // Register your user here!
    //       console.log(req.body.user);
    //   }
    //       cb(null, idToken);
    //     } catch (error) {
            
    //     }
    
    
    // }
    
    // )
    
    // );

};


