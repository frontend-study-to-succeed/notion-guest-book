import Express from 'express';

import {
  getAllComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} from '../controllers/comments.js';

const router = Express.Router();

router.route('/').get(getAllComments).post(createComment);
router.route('/:id').get(getComment).patch(updateComment).delete(deleteComment);

export default router;
