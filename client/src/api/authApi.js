import { api } from './apiCore';
import * as url from './urls';

function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await api.post(url.LOGIN, { email, password });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}

function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      await api.post(url.LOGOUT);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function getSessionUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await api.get(url.GET_SESSION_USER);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}

function registerUser(email, password, additionalFields = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await api.post('register', {
        email,
        password,
        ...additionalFields
      });
      resolve(user);
    } catch (error) {
      reject(error);
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
