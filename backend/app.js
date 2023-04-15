const express = require('express');
const userRoutes = require('./routes/user');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  next();
});

app.use('/api/user', userRoutes);

module.exports = app;
