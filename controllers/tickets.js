const Ticket = require('../models/ticket');

module.exports = {
  getTickets: async (req, res, next) => {
    const tickets = await Ticket.find({}).populate('owner');
    res.render('tickets/index', { tickets });
  },
  createTicketForm: (req, res) => {
    res.render('tickets/new');
  },
  createTicket: async (req, res) => {
    const ticket = new Ticket(req.body.ticket);
    ticket.owner = req.user._id;
    await ticket.save();
    req.flash('success', 'Successfully created a new ticket');
    res.redirect(`/tickets/${ticket._id}`);
  },
  showTicket: async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id)
      .populate({
        path: 'comments',
        populate: { path: 'author' },
      })
      .populate('owner');
    console.log(ticket);
    if (!ticket) {
      req.flash('error', 'Cannot find ticket');
      res.redirect('/tickets');
    }
    res.render('tickets/show', { ticket });
  },
  editTicketForm: async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      req.flash('error', 'Cannot find ticket');
      res.redirect('/tickets');
    }

    res.render('tickets/edit', { ticket });
  },
  editTicket: async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, { ...req.body.ticket });
    res.redirect(`/tickets/${ticket._id}`);
  },
  deleteTicket: async (req, res) => {
    const { id } = req.params;
    await Ticket.findByIdAndDelete(id);
    req.flash('success', 'Ticket deleted');
    res.redirect(`/tickets`);
  },
};
