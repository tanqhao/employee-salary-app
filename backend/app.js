const express = require('express');
const userRoutes = require('./routes/user');
const bodyParser = require("body-parser");

const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')


mongoose.connect(process.env.DB_CONNECT).then(()=> {
  console.log('DB connection success');
}).catch(()=>{
  console.log('DB connection failed');
})


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  next();
});

app.use('/api/user', userRoutes);

module.exports = app;
