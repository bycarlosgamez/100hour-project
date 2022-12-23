const Ticket = require('../models/ticket');
const Comment = require('../models/comment');

module.exports = {
  isLoggedIn: function (req, res, next) {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.flash('error', 'You must be logged in');
      return res.redirect('/login');
    }
    next();
  },
  isOwner: async function (req, res, next) {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket.owner.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to perform this action');
      res.redirect(`/tickets/${id}`);
    }
    next();
  },
  isCommentAuthor: async function (req, res, next) {
    const { id, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to perform this action');
      res.redirect(`/tickets/${id}`);
    }
    next();
  },
};
