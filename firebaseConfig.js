// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN22VAFschVtqfTkfLkwXgvKDY8t4Jfso",
  authDomain: "smart-cafeteria-75c37.firebaseapp.com",
  projectId: "smart-cafeteria-75c37",
  storageBucket: "smart-cafeteria-75c37.appspot.com",
  messagingSenderId: "433447662836",
  appId: "1:433447662836:web:a00d93567c309321f4daa1",
  measurementId: "G-JDNZ31TRVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);