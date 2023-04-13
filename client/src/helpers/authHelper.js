import { APIClient } from '../api/apiCore';

function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const api = new APIClient();
      const user = await api.post('login', {email, password});
      console.log('user logged in', user);
      resolve(user);
    } catch (error) {
      reject(error.message);
    }
  });
}

function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      await new APIClient().get('/logout');
      console.log('logged out');
      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
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

const setLoggedInUser = (user) => {
  if (user == null) localStorage.removeItem('authUser');
  else localStorage.setItem('authUser', JSON.stringify(user));
};

const getLoggedInUser = () => {
  if (!localStorage.getItem('authUser')) return null;
  return JSON.parse(localStorage.getItem('authUser'));
};

const authHelper = {
  loginUser,
  logoutUser,
  registerUser,
  setLoggedInUser,
  getLoggedInUser
};

export default authHelper;
