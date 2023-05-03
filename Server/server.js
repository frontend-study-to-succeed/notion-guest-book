import Express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = Express();

app.get('/', (req, res) => {
  res.send('hihi');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
