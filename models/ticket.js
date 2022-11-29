const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  title: String,
  description: String,
  //   assigned: String,
  //   owner: String,
  project: String,
  priority: String,
  //   status: String,
  //   type: String,
  //   date: Date,
  //   updated: Date,
});

module.exports = mongoose.model('Ticket', TicketSchema, 'tickets');
