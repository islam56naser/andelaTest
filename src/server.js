const express = require('express');
const apiRouter = require('./api/api.router');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', apiRouter);

// set up global error handling
app.use((err, req, res, next) => {
  return res.status(500).send();
});

// export the app for testing
module.exports = app;
