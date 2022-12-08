const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  owner: String,
  assigned: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    defaul: 'bug',
    enum: ['bug', 'feature', 'document', 'other'],
  },
  priority: {
    type: String,
    defaul: 'high',
    enum: ['high', 'medium', 'low'],
  },
  status: {
    type: String,
    defaul: 'open',
    enum: ['open', 'solved', 'awaiting'],
  },
  project: String,
});

module.exports = mongoose.model('Ticket', TicketSchema, 'tickets');
