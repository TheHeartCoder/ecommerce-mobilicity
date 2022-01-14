import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
const morgan = require('morgan');
require('dotenv').config();
import { dbConnect } from './config/dbConnect';

dbConnect();
const csrfProtection = csrf({ cookie: true });
const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// route
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
