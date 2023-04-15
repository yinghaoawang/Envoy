import { APIClient } from './apiCore';
import { GET_SESSION_USER, LOGIN, LOGOUT } from './urls';

const api = new APIClient();

function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await api.post(LOGIN, {email, password});
      resolve(user);
    } catch (error) {
      reject(error.message);
    }
  });
}

function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      await api.post(LOGOUT);
      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
}

function getSessionUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await api.get(GET_SESSION_USER);
      console.log('got session user');
      resolve(user);
    } catch (error) {
      reject(error.message);
    }
  })
}

function registerUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await api.post('register', {email, password});
      console.log('user registered', user);
      resolve(user);
    } catch (error) {
      reject(error.message);
    }
  });
}

const authApi = {
  loginUser,
  logoutUser,
  registerUser,
  getSessionUser
};

export default authApi;
