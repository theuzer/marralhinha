const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./server/routes');
require('./server/database');

const port = process.env.PORT || 5000;

const app = express();

// Body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
