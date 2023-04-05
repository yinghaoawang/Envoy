// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAECSkH3xgcFNxLeTbflXoOCmYuMjJTwag',
  authDomain: 'envoy-fb9c4.firebaseapp.com',
  projectId: 'envoy-fb9c4',
  storageBucket: 'envoy-fb9c4.appspot.com',
  messagingSenderId: '584606269189',
  appId: '1:584606269189:web:a9bd8beb76c93137c4c16c',
  measurementId: 'G-G9X46Z64X2'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        resolve(auth.currentUser);
      },
      (error) => {
        reject(error.message);
      }
    );
  });
}

const firebaseHelper = {
  loginUser
};

export default firebaseHelper;
