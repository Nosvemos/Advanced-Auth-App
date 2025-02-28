import express from 'express';
import { config } from 'dotenv'

import { connectDb } from './lib/db.js'

config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  connectDb();
  console.log('Server is running on port 3000');
});