const mongoose = require('mongoose');

const mongoUser = process.env.DB_USERNAME;
const mongoPass = process.env.DB_PASSWORD;
const mongoHost = process.env.DB_HOST;
const mongoPort = process.env.DB_PORT;
const mongoName = process.env.DB_NAME;

const dbURI = `mongodb://${encodeURIComponent(mongoUser)}:${encodeURIComponent(mongoPass)}@${mongoHost}:${mongoPort}/${mongoName}`;
mongoose.connect(dbURI);
mongoose.connection.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

exports.mongoose = mongoose;
