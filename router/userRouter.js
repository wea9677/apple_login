require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authmiddleware = require('../middleware/authmiddleware')

const router = express.Router();

const {
    googleCallback
} = require('../controller/usercontroller')


/**
 * Google passport router
 */
router.get('/google', passport.authenticate('google'));

router.get('google/callback', googleCallback)

/**
 * User info
 */

router.get('/me', authmiddleware, checkme);