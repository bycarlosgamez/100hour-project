const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const ExpressError = require('../helpers/ExpressError');
const Ticket = require('../models/ticket');
const { isLoggedIn, isOwner } = require('../middleware/auth');

// @description     Show all available tickets
// @route           GET /tickets
router.get(
  '/',
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const tickets = await Ticket.find({});
    console.log(tickets);
    res.render('tickets/index', { tickets });
  })
);

// @description     Show new ticket page
// @route           GET /tickets/new
router.get('/new', isLoggedIn, (req, res) => {
  res.render('tickets/new');
});

// @description     Process Create ticket form
// @route           POST /tickets
router.post(
  '/',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const ticket = new Ticket(req.body.ticket);
    ticket.owner = req.user._id;
    await ticket.save();
    req.flash('success', 'Successfully created a new ticket');
    res.redirect(`/tickets/${ticket._id}`);
  })
);

// @description     Show individual ticket page by id
// @route           GET /tickets/:id
router.get(
  '/:id',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id)
      .populate('comments')
      .populate('owner');
    if (!ticket) {
      req.flash('error', 'Cannot find ticket');
      res.redirect('/tickets');
    }
    res.render('tickets/show', { ticket });
  })
);

// @description     Show edit ticket page
// @route           GET /tickets/:id/edit
router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      req.flash('error', 'Cannot find ticket');
      res.redirect('/tickets');
    }

    res.render('tickets/edit', { ticket });
  })
);

// @description     Process Edit ticket form
// @route           PUT /tickets/:id/
router.put(
  '/:id',
  isLoggedIn,
  isOwner,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, { ...req.body.ticket });
    res.redirect(`/tickets/${ticket._id}`);
  })
);

// @description     Process Delete ticket form
// @route           DELETE /tickets/:id/
router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Ticket.findByIdAndDelete(id);
    req.flash('success', 'Ticket deleted');
    res.redirect(`/tickets`);
  })
);

module.exports = router;
