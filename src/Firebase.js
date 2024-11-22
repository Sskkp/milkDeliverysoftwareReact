// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC90hN7NVg13AdsfrSkz-VgsrbtpcIimYk",
  authDomain: "w624-react-dav-sandeep-milksof.firebaseapp.com",
  projectId: "w624-react-dav-sandeep-milksof",
  storageBucket: "w624-react-dav-sandeep-milksof.appspot.com",
  messagingSenderId: "36855474528",
  appId: "1:36855474528:web:acdbc48becd034c4549605",
  measurementId: "G-K0PDQYL1QR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export {db , auth}