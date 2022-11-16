require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authmiddleware = require('../middleware/authmiddleware')

const router = express.Router();

const {
    googleCallback, appleSign
} = require('../controller/usercontroller')


/**
 * Google passport router
 */
router.get('/google', passport.authenticate('google'));

router.get('google/callback', googleCallback)


/**
 * Apple-auth router
 */

router.get('/apple/auth', appleSign)

/**
 * User info
 */

router.get('/me', authmiddleware, checkme);