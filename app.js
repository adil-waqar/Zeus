const express = require('express');
const logger = require('morgan');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

require('./server/routes')(app);

app.get('*', (req, res) => {
  res.status(200).send({ message: 'You have ended up in a catch all route!' });
});

module.exports = app;
