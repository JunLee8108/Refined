// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4FHoHIiYCMV4s58MhVn0i9lFtZI90zc0",
  authDomain: "refine-f8c47.firebaseapp.com",
  projectId: "refine-f8c47",
  storageBucket: "refine-f8c47.appspot.com",
  messagingSenderId: "391597233545",
  appId: "1:391597233545:web:c1b5d4fe752be0d1cc7d58",
  measurementId: "G-F1PR210NG2",
};

// Initialize Firebase
const analytics = getAnalytics(firebase);
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
