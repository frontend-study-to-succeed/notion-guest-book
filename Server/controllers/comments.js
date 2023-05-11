import Comment from '../models/comments.js';

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).select('-userPassword');
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

const updateComment = (req, res) => {
  res.send('특정 방명록을 수정합니다.');
};

const deleteComment = async (req, res) => {
  try {
    const comments = await Comment.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { getAllComments, createComment, getComment, updateComment, deleteComment };
