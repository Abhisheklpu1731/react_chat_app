import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByAkzNG86xcBXXQh2gMAhxAM-OuNufO44",
  authDomain: "reactchat-dd083.firebaseapp.com",
  databaseURL: "https://reactchat-dd083-default-rtdb.firebaseio.com",
  projectId: "reactchat-dd083",
  storageBucket: "reactchat-dd083.appspot.com",
  messagingSenderId: "536695560886",
  appId: "1:536695560886:web:de47f9a41aeb87a985a417",
  measurementId: "G-9SHRVV7N6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);