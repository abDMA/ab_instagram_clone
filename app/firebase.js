// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrmtGNwoEKVWtu7-sI8-1QM7PEWFHOh-U",
  authDomain: "instagram-clone-31523.firebaseapp.com",
  projectId: "instagram-clone-31523",
  storageBucket: "instagram-clone-31523.appspot.com",
  messagingSenderId: "843803644325",
  appId: "1:843803644325:web:353210188fc7f635d7184c"
};

// Initialize Firebase
export const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const storage = getStorage(app)
export const db = getFirestore(app);
export const auth = getAuth(app)
export default firebaseConfig;

