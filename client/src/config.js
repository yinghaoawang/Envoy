const config = {
  API_URL:  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : "http://localhost:1270",
  SOCKET_URL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SOCKET_URL : 'http://localhost:1270',
  BASENAME: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASENAME : '',
};

export default config;
