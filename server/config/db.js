// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL)
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });


module.exports = mongoose;
