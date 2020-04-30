const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./server');

dotenv.config();
app.listen(process.env.serverPort);
console.log('info', `Server running at ${process.env.serverPort}`);
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true
};
mongoose.connect(`mongodb://${process.env.dbHost}:${process.env.dbPort}/${process.env.dbName}`, mongooseOptions, (err) => {
  if (err) {
    console.log('error', 'Monoose failed to connect', { meta: err.stack });
  } else {
    console.log('info', 'Mongoose connected');
  }
});

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.error(error);
});
