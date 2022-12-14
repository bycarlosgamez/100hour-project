const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const ExpressError = require('../helpers/ExpressError');
const Ticket = require('../models/ticket');

// see all tickets
router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const tickets = await Ticket.find({});
    res.render('tickets/index', { tickets });
  })
);

// create new ticket
router.get('/new', (req, res) => {
  res.render('tickets/new');
});

router.post(
  '/',
  catchAsync(async (req, res) => {
    // if (!req.body.ticket) throw new ExpressError('Ivalid Ticket Data', 400);
    const ticket = new Ticket(req.body.ticket);
    await ticket.save();
    req.flash('success', 'Successfully created a new ticket');
    res.redirect(`/tickets/${ticket._id}`);
  })
);

// show individual ticket by id
router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate('comments');
    res.render('tickets/show', { ticket });
  })
);

// edit existing ticket
router.get(
  '/:id/edit',
  catchAsync(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    res.render('tickets/edit', { ticket });
  })
);

router.put(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, { ...req.body.ticket });
    res.redirect(`/tickets/${ticket._id}`);
  })
);

// delete ticket
router.delete(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Ticket.findByIdAndDelete(id);
    req.flash('success', 'Ticket deleted');
    res.redirect(`/tickets`);
  })
);

module.exports = router;
