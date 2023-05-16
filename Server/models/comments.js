import mongoose, { Schema } from 'mongoose';

const CommentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userProfile: {
    type: String,
    required: false,
  },
  commentDate: {
    type: Date,
    required: true,
  },
  commentType: {
    type: String,
    required: true,
  },
  commentContent: {
    type: String,
    required: true,
  },
  commentReply: {
    userName: {
      type: String,
      required: false,
    },
    userProfile: {
      type: String,
      required: false,
    },
    commentType: {
      type: String,
      required: false,
    },
    commentContent: {
      type: String,
      required: false,
    },
  },
  commentReactions: [
    {
      icon: {
        type: String,
        required: false,
      },
      count: {
        type: Number,
        required: false,
      },
    },
  ],
});

export default mongoose.model('Comment', CommentSchema);

// {
//   "id": 0,
//   "name": "김주현",
//   "date": "2023/04/28 17:44",
//   "comment": {
//     "type": "text",
//     "content": "자~ 뒤졌습니다~"
//   },
//   "reaction": [
//     {
//       "id": 0,
//       "icon": "😇",
//       "count": 1
//     },
//     {
//       "id": 1,
//       "icon": "😂",
//       "count": 1
//     }
//   ],
//   "reply": {
//     "id": 0,
//     "author": "김주현",
//     "content": "하지만 뒤지는 건..."
//   }
// },
