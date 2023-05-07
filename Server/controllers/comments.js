import Comment from '../models/comments.js';

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).select('-password');
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
//   "name": "김주현",
//   "date": "2023/04/28 17:44",
//   "comment": {
//     "type": "text",
//     "content": "자~ 뒤졌습니다~"
//   },
const createComment = async (req, res) => {
  try {
    // console.log(req);
    const comment = await Comment.create(req.body);
    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getComment = (req, res) => {
  res.json({ id: req.params.id });
};

const updateComment = (req, res) => {
  res.send('특정 방명록을 수정합니다.');
};

const deleteComment = (req, res) => {
  res.send('특정 방명록을 삭제했습니다.');
};

export { getAllComments, createComment, getComment, updateComment, deleteComment };
