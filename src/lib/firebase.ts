import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_lCaDbHndB2i0OyGN4EFhB55E-EqFV9g",
  authDomain: "okul-yonetim-sistemi-b7e96.firebaseapp.com",
  projectId: "okul-yonetim-sistemi-b7e96",
  storageBucket: "okul-yonetim-sistemi-b7e96.appspot.com",
  messagingSenderId: "53262320445",
  appId: "1:53262320445:web:9276059873f7acb013fb54",
  measurementId: "G-7DN4L3T4FC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();