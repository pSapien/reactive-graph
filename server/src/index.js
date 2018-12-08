require('dotenv').config();

const db = require('./db');
const createServer = require('./createServer');

const server = createServer();

const config = {
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
};

server.start(config, ({ port }) => {
  console.log(`Server is running on port ${port}`);
});
