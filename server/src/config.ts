require('dotenv').config();

const config = {
  PORT: 1270,
  SESSION_SECRET: 'i dont know if session secrets are case sensitive',
  POSTGRES: {
    USER: process.env.PG_USER,
    HOST: process.env.PG_HOST,
    DATABASE: process.env.PG_DATABASE,
    PASSWORD: process.env.PG_PASSWORD,
    PORT: process.env.PG_PORT
  }
};

module.exports = config;
