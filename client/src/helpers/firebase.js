// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import config from '../config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.FIREBASE.API_KEY,
  authDomain: config.FIREBASE.AUTH_DOMAIN,
  projectId: config.FIREBASE.PROJECT_ID,
  storageBucket: config.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE.MESSAGING_SENDER_ID,
  appId: config.FIREBASE.APP_ID,
  measurementId: config.FIREBASE.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
initFirebase();

function initFirebase() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser(user);
    } else {
      localStorage.removeItem('authUser');
    }
  });
}

function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      resolve(userCredential);
    } catch (error) {
      reject(error.message);
    }
  });
}

function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log('sign out successful');
      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
}

function registerUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      resolve(userCredential);
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

const firebaseHelper = {
  loginUser,
  logoutUser,
  registerUser,
  setLoggedInUser,
  getLoggedInUser
};

export default firebaseHelper;
