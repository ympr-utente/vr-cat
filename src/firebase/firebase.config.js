// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB05ilY6TtnJctpY_JBqQvX9Hz6__RgHU8",
  authDomain: "vr-cat.firebaseapp.com",
  projectId: "vr-cat",
  storageBucket: "vr-cat.appspot.com",
  messagingSenderId: "398421404500",
  appId: "1:398421404500:web:71f1e893d7a1b28247b6c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//export auth
const auth = getAuth(app);

//export firestore
const db = getFirestore(app);

export {auth, db};