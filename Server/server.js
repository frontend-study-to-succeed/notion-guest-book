import Express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './db/connect.js';

import commentsRoute from './routes/comments.js';

dotenv.config();

const app = Express();

// middleware
app.use(Express.json());
app.use(cors());

// routes
app.use('/api/v1/comments', commentsRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
