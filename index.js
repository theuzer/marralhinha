const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const routes = require('./server/routes');
require('./server/database');

const port = process.env.PORT || 5000;

const app = express();

// Body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

// Keep app awake
setInterval(() => {
  https.get(process.env.HEROKU_APP_URL);
  console.log('Pinged application');
}, 300000);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
