import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
require('dotenv').config();

// bring routes
import blogRoutes from './routes/blog';
import authRoutes from './routes/auth';

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser    : true,
  useCreateIndex     : true,
  useUnifiedTopology : true,
  useFindAndModify   : false
}).then(() => console.log('DB connected'));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
