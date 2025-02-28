import express from 'express';
import dotenv from 'dotenv'

import { connectDb } from './lib/db.js'

import errorHandler from "./middlewares/errorHandler.js";

import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();