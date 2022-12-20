const Ticket = require('../models/ticket');
const Comment = require('../models/comment');

module.exports = {
  createComment: async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    ticket.comments.push(comment);
    await comment.save();
    await ticket.save();
    req.flash('success', 'Comment posted');
    res.redirect(`/tickets/${ticket._id}`);
  },
  deleteComment: async (req, res) => {
    const { id, commentId } = req.params;
    await Ticket.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Comment deleted');
    res.redirect(`/tickets/${id}`);
  },
};
