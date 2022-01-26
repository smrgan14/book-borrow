const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '.env') });

module.exports = {
  node_env: process.env.NODE_ENV,
  server_port: process.env.SERVER_PORT,
  db: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  jwt: {
      secret_key: process.env.JWT_SECRET_KEY
  },
  session: {
    key: process.env.SESSION_KEY
  }
};
