// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDZEc1qHWHvqhZCCc5770U58OV8yS_TIo",
    authDomain: "react-musclememo.firebaseapp.com",
    projectId: "react-musclememo",
    storageBucket: "react-musclememo.appspot.com",
    messagingSenderId: "290544332060",
    appId: "1:290544332060:web:aa10d3f7071bcab780ded9",
    measurementId: "G-ZCVHB3WQXM",
};

// Initialize Firebase
// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };
