const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  title: String,
  description: String,
  owner: String,
  assigned: String,
  created: Date,
  updated: Date,
  type: String,
  priority: String,
  status: String,
  project: String,
});

module.exports = mongoose.model('Ticket', TicketSchema, 'tickets');
