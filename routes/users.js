const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const usersController = require('../controllers/users');

// @description     Show Signup page
// @route           GET /signup
router.get('/signup', usersController.getSignup);

// @description     Process Signup form
// @route           POST /signup
router.post('/signup', catchAsync(usersController.signup));

// @description     Show Login page
// @route           GET /login
router.get('/login', usersController.getLogin);

// @description     Process Login form
// @route           POST /login
router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  usersController.login
);

// @description     Process logout form
// @route           POST /logout
router.post('/logout', usersController.logout);

module.exports = router;
