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
    default: 'bug',
    enum: ['bug', 'feature', 'document', 'other'],
  },
  priority: {
    type: String,
    default: 'high',
    enum: ['high', 'medium', 'low'],
  },
  status: {
    type: String,
    default: 'open',
    enum: ['open', 'solved', 'awaiting'],
  },
  project: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

module.exports = mongoose.model('Ticket', TicketSchema, 'tickets');
