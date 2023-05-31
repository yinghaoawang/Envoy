require('dotenv').config();

const config = {
  CLIENT_HOST: process.env.NODE_ENV === 'production' ? process.env.CLIENT_HOST : 'http://localhost:3000',
  PORT: 1270,
  SESSION_SECRET: 'i dont know if session secrets are case sensitive',
  POSTGRES: {
    USER: process.env.PG_USER,
    HOST: process.env.PG_HOST,
    DATABASE: process.env.PG_DATABASE,
    PASSWORD: process.env.PG_PASSWORD,
    PORT: process.env.PG_PORT
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET
  }
};

module.exports = config;
