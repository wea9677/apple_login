require('dotenv').config();
const express = require('express');
const passport = require('passport');

// const authmiddleware = require('../middleware/authmiddleware')

const router = express.Router();

const { appleCallback
} = require('../controller/usercontroller')


/**
 * Google passport router
 */
// router.get('/google', passport.authenticate('google'));

// router.get('/google/callback', googleCallback)


/**
 * Apple-auth router
 */

router.get('/login', passport.authenticate('apple'))

router.post('/auth', appleCallback)

/**
 * User info
 */

// router.get('/me', authmiddleware, checkme);


module.exports = router;