import express from "express";
import { config } from 'dotenv';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/users.js';
config()

const app = express();

const PORT = process.env.PORT 


app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
  }));

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(UserRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
