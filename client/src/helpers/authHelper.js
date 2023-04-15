import { APIClient } from '../api/apiCore';
import { GET_SESSION_USER, LOGIN, LOGOUT } from '../api/urls';

function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const api = new APIClient();
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
      await new APIClient().get(LOGOUT);
      console.log('logged out');
      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
}

function getSessionUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await new APIClient().get(GET_SESSION_USER);
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
      const api = new APIClient();
      const user = await api.post('register', {email, password});
      console.log('user registered', user);
      resolve(user);
    } catch (error) {
      reject(error.message);
    }
  });
}

const authHelper = {
  loginUser,
  logoutUser,
  registerUser,
  getSessionUser
};

export default authHelper;
