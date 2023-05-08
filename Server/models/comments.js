import mongoose, { Schema } from 'mongoose';

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  commentType: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  reply: {
    author: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
  },
  reactions: [
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
