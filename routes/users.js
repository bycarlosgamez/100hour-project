const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const { register } = require('../models/user');
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post(
  '/register',
  catchAsync(async (req, res) => {
    res.send(req.body);
    // const user = new User(req.body);
    // await user.save();
    // req.flash('success', 'Successfully created an account');
    // res.redirect(`/tickets/${ticket._id}`);
  })
);

router.post('/');

module.exports = router;
