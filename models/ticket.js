const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

const attachementsSchemma = new Schema({
  url: String,
  filename: String,
});

attachementsSchemma.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  attachements: [attachementsSchemma],
});

TicketSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

module.exports = mongoose.model('Ticket', TicketSchema, 'tickets');
