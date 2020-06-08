import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
require('dotenv').config();

// bring routes
import blogRoutes from './src/routes/blog';
import authRoutes from './src/routes/auth';

const { DATABASE, NODE_ENV, CLIENT_URL, PORT } = process.env;

// app
const app = express();

// db
mongoose
  .connect(DATABASE, {
    useNewUrlParser    : true,
    useCreateIndex     : true,
    useUnifiedTopology : true,
    useFindAndModify   : false })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
const isProduction = NODE_ENV === 'production'
app.use(cors({ origin: isProduction ? `${CLIENT_URL}` : '*' }))

// routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// port
const port = PORT || 5000;
app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
