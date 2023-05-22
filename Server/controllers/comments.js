import Comment from '../models/comments.js';

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).select('-userPassword');
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getCommentsByPage = async (req, res) => {
  const currentPage = req.query.page || 1;

  try {
    console.log(currentPage);
    const comments = await Comment.find({})
      .sort({ commentDate: 'desc' })
      .skip((currentPage - 1) * 10)
      .limit(10)
      .select('-userPassword');

    comments.sort((a, b) => a.commentDate - b.commentDate);

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getComment = async (req, res) => {
  try {
    const comments = await Comment.find({ _id: req.params.id }).select('-userPassword');
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    // console.log(comment);
    const commentReactions = comment.commentReactions;

    if (!commentReactions.length) {
      comment.commentReactions.push({ icon: req.body.icon, count: 1 });
    } else {
      const reactionIndex = comment.commentReactions.findIndex((value) => value.icon === req.body.icon.toString());

      if (reactionIndex !== -1) {
        comment.commentReactions[reactionIndex].count++;
      } else {
        comment.commentReactions.push({ icon: req.body.icon, count: 1 });
      }
    }

    // console.log(comment);
    await comment.save();

    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  // console.log(req);
};

const deleteComment = async (req, res) => {
  try {
    const comments = await Comment.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const compareCommentPassword = async (req, res) => {
  try {
    const commentPassword = await Comment.find({ _id: req.body.id }).select('userPassword');
    res.status(200).json({ compare: req.body.password === commentPassword[0].userPassword });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export {
  getAllComments,
  getCommentsByPage,
  createComment,
  getComment,
  updateComment,
  deleteComment,
  compareCommentPassword,
};
